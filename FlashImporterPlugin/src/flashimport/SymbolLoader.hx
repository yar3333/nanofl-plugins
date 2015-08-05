package flashimport;

import htmlparser.HtmlNodeElement;
import htmlparser.XmlDocument;
import nanofl.engine.coloreffects.ColorEffect;
import nanofl.engine.coloreffects.ColorEffectAdvanced;
import nanofl.engine.coloreffects.ColorEffectAlpha;
import nanofl.engine.coloreffects.ColorEffectBrightness;
import nanofl.engine.coloreffects.ColorEffectTint;
import nanofl.engine.ColorTools;
import nanofl.engine.elements.Element;
import nanofl.engine.elements.GroupElement;
import nanofl.engine.elements.Instance;
import nanofl.engine.elements.ShapeElement;
import nanofl.engine.elements.TextElement;
import nanofl.engine.FileApi;
import nanofl.engine.fills.BitmapFill;
import nanofl.engine.fills.IFill;
import nanofl.engine.fills.LinearFill;
import nanofl.engine.fills.RadialFill;
import nanofl.engine.fills.SolidFill;
import nanofl.engine.FilterDef;
import nanofl.engine.geom.Matrix;
import nanofl.engine.geom.PointTools;
import nanofl.engine.KeyFrame;
import nanofl.engine.Layer;
import nanofl.engine.Library;
import nanofl.engine.libraryitems.BitmapItem;
import nanofl.engine.libraryitems.InstancableItem;
import nanofl.engine.libraryitems.LibraryItem;
import nanofl.engine.libraryitems.MovieClipItem;
import nanofl.engine.strokes.IStroke;
import nanofl.engine.strokes.SolidStroke;
import nanofl.engine.MotionTween;
import nanofl.TextRun;
import stdlib.Std;
import stdlib.Utf8;
using htmlparser.HtmlParserTools;
using StringTools;
using Lambda;

class SymbolLoader
{
	static var EPS = 1e-10;
	
	var fileApi : FileApi;
	var doc : XmlDocument;
	var srcLibDir : String;
	var library : Library;
	var log : Dynamic->Void;
	
	var fontMap = new Map<String, { face:String, style:String }>();
	var morphingNotSupported = new Array<String>();
	var fontConvertor : FontConvertor;
	
	public function new(fileApi:FileApi, doc:XmlDocument, srcLibDir:String, library:Library, fonts:Array<String>, ?log:Dynamic->Void)
	{
		this.fileApi = fileApi;
		this.doc = doc;
		this.srcLibDir = srcLibDir;
		this.library = library;
		this.log = log != null ? log : function(v) {};
		
		this.fontConvertor = new FontConvertor(fonts);
	}
	
	public function loadFromLibrary(namePath:String) : LibraryItem
	{
		if (!library.hasItem(namePath))
		{
			var filePath = srcLibDir + "/" + namePath + ".xml";
			if (fileApi.exists(filePath))
			{
				loadFromXml(namePath, new XmlDocument(fileApi.getContent(filePath)));
			}
			else
			{
				library.addItem(loadBitmap(namePath));
			}
		}
		return library.getItem(namePath);
	}
	
	public function loadFromXml(namePath:String, src:HtmlNodeElement) : MovieClipItem
	{
		if (library.hasItem(namePath)) return cast(library.getItem(namePath), MovieClipItem);
		
		var symbolItemXml = src.findOne(">DOMSymbolItem");
		if (symbolItemXml == null) symbolItemXml = src.findOne(">DOMDocument");
		
		var r = new MovieClipItem(namePath);
		r.likeButton = symbolItemXml.getAttr("symbolType") == "button";
		loadLinkage(r, symbolItemXml);
		for (layer in symbolItemXml.find(">timeline>DOMTimeline>layers>DOMLayer").concat(symbolItemXml.find(">timelines>DOMTimeline>layers>DOMLayer")))
		{
			r.addLayer(loadLayer(layer, namePath));
		}
		library.addItem(r);
		
		return r;
	}
	
	function loadBitmap(namePath:String) : BitmapItem
	{
		var r = new BitmapItem(namePath, "png");
		for (node in doc.find(">DOMDocument>media>DOMBitmapItem"))
		{
			if (node.getAttr("name") == namePath)
			{
				loadLinkage(r, node);
				break;
			}
		}
		return r;
	}
	
	function loadLayer(layer:HtmlNodeElement, namePathForLog:String) : Layer
	{
		var r = new Layer
		(
			layer.getAttr("name"),
			layer.getAttr("layerType", "normal"),
			layer.getAttr("visible", true),
			layer.getAttr("locked", false),
			layer.getAttrInt("parentLayerIndex")
		);
		for (frame in layer.find(">frames>DOMFrame"))
		{
			r.addKeyFrame(loadFrame(frame, namePathForLog));
		}
		return r;
	}
	
	function loadFrame(frame:HtmlNodeElement, namePathForLog:String)
	{
		return new KeyFrame
		(
			frame.getAttr("name", ""),
			Std.int(frame.getAttr("duration", 1)),
			loadMotionTween(frame, namePathForLog),
			loadElements(frame.find(">elements>*"), new Matrix())
		);
	}
	
	function loadMotionTween(frame:HtmlNodeElement, namePathForLog:String) : MotionTween
	{
		var type = frame.getAttr("tweenType", "none");
		switch (type)
		{
			case "none": // do nothing
				return null;
			
			case "motion":
				return new MotionTween
				(
					frame.getAttr("acceleration", 0),
					parseMotionTweenRotate(frame.getAttr("motionTweenRotate"), frame.getAttr("motionTweenRotateTimes", 1)),
					frame.getAttr("motionTweenOrientToPath", false)
				);
				
			case "shape":
				if (!morphingNotSupported.has(namePathForLog))
				{
					morphingNotSupported.push(namePathForLog);
					log("WARNING: shape morphing tween is not supported (symbol '" + namePathForLog + "').");
				}
				return null;
				
			case _:
				log("WARNING: unknow tween type '" + type + "' (symbol '" + namePathForLog + "').");
				return null;
		}
	}
	
	function loadElements(elements:Array<HtmlNodeElement>, parentMatrix:Matrix)
	{
		var r = new Array<Element>();
		for (element in elements)
		{
			switch (element.name)
			{
				case "DOMSymbolInstance", "DOMBitmapInstance":
					var instance = new Instance
					(
						element.getAttr("libraryItemName"),
						element.getAttr("name", ""),
						loadColorEffect(element.findOne(">color>Color")),
						element.find(">filters>*").map(function(f) return loadFilter(f))
					);
					instance.matrix = MatrixParser.load(element.findOne(">matrix>Matrix")).prependMatrix(parentMatrix);
					loadRegPoint(instance, element.findOne(">transformationPoint>Point"));
					r.push(instance);
					
				case "DOMShape":
					if (!element.getAttr("isDrawingObject", false))
					{
						r.push(loadShape(element, parentMatrix));
					}
					else
					{
						r.push(new GroupElement([ loadShape(element, parentMatrix) ]));
					}
					
				case "DOMStaticText", "DOMDynamicText", "DOMInputText":
					r.push(loadText(element, parentMatrix));
					
				case "DOMGroup":
					var elements = element.find(">members>*");
					if (elements.length > 0)
					{
						var m = MatrixParser.load(element.findOne(">matrix>Matrix"));
						var group = new GroupElement(loadElements(elements, m.clone().invert().prependMatrix(parentMatrix)));
						group.matrix = m;
						r.push(group);
					}
					
				case _:
					log("WARNING: unknow element node: '" + element.name + "'.");
			}
		}
		return r;
	}
	
	function loadShape(element:HtmlNodeElement, parentMatrix:Matrix) : ShapeElement
	{
		var strokes = element.find(">strokes>StrokeStyle>*").map(function(stroke) return loadShapeStroke(stroke));
		var fills = element.find(">fills>FillStyle>*").map(function(fill) return loadShapeFill(fill).fill);
		
		var p = new ShapeConvertor(strokes, fills, loadEdgeDatas(element)).convert();
		
		var shape = new ShapeElement(p.edges, p.polygons);
		shape.matrix = MatrixParser.load(element.findOne(">matrix>Matrix")).prependMatrix(parentMatrix);
		loadRegPoint(shape, element.findOne(">transformationPoint>Point"));
		shape.ensureNoTransform();
		
		return shape;
	}
	
	function loadEdgeDatas(element:HtmlNodeElement) : Array<EdgeData>
	{
		var r = [];
		for (edge in element.find(">edges>Edge"))
		{
			var edgeData = new EdgeData(edge);
			if ((edgeData.fillStyle0 != null || edgeData.fillStyle1 != null || edgeData.strokeStyle != null) && edgeData.drawOps.length > 0)
			{
				r.push(edgeData);
			}
		}
		return r;
	}
	
	function loadShapeFill(fill:HtmlNodeElement) : { fill:IFill, matrix:Matrix }
	{
		switch (fill.name)
		{
			case "SolidColor":
				return
				{
					fill: new SolidFill(ColorTools.colorToString(fill.getAttr("color", "#000000"), fill.getAttr("alpha", 1.0))),
					matrix: new Matrix()
				};
				
			case "LinearGradient":
				var gradients = fill.find(">GradientEntry");
				var m = MatrixParser.load(fill.findOne(">matrix>Matrix"), 1 / 819.2);
				var p0 = m.transformPoint(-1, 0);
				var p1 = m.transformPoint( 1, 0);
				return
				{
					fill: new LinearFill
					(
						gradients.map(function(g) return ColorTools.colorToString(g.getAttr("color", "#000000"), g.getAttr("alpha", 1.0))),
						gradients.map(function(g) return g.getAttr("ratio")),
						p0.x,
						p0.y,
						p1.x,
						p1.y
					),
					matrix: new Matrix()
				};
				//writeRegPoint(element.findOne(">transformationPoint>Point"));
				
			case "RadialGradient":
				var focalPointRatio = fill.getAttr("focalPointRatio", 0.0);
				var gradients = fill.find(">GradientEntry");
				var m = MatrixParser.load(fill.findOne(">matrix>Matrix"), 1 / 819.2);
				
				var p0 = m.transformPoint(0, 0);
				var p1 = m.transformPoint(1, 0);
				var p2 = m.transformPoint(0, 1);
				
				if (Math.abs(PointTools.getDist(p0.x, p0.y, p2.x, p2.y) - PointTools.getDist(p0.x, p0.y, p1.x, p1.y)) < EPS)
				{
					return
					{
						fill: new RadialFill
						(
							gradients.map(function(g) return ColorTools.colorToString(g.getAttr("color", "#000000"), g.getAttr("alpha", 1.0))),
							gradients.map(function(g) return g.getAttr("ratio")),
							p0.x,
							p0.y,
							PointTools.getDist(p0.x, p0.y, p1.x, p1.y),
							p0.x + (p1.x - p0.x) * focalPointRatio,
							p0.y + (p1.y - p0.y) * focalPointRatio
							
						),
						matrix: new Matrix()
					};
				}
				else
				{
					return
					{
						fill: new RadialFill
						(
							gradients.map(function(g) return ColorTools.colorToString(g.getAttr("color", "#000000"), g.getAttr("alpha", 1.0))),
							gradients.map(function(g) return g.getAttr("ratio")),
							0,
							0,
							1,
							focalPointRatio,
							0
						),
						matrix: m
					};
					
				}
				//writeRegPoint(element.findOne(">transformationPoint>Point"));
				
			case "BitmapFill":
				return
				{
					fill: new BitmapFill
					(
						fill.getAttr("bitmapPath"),
						fill.getAttr("bitmapIsClipped", true) ? "no-repeat" : "repeat",
						MatrixParser.load(fill.findOne(">matrix>Matrix"), 20)
					),
					matrix: new Matrix()
				};
				
			case _:
				log("WARNING: unknow fill type '" + fill.name + "'.");
				return
				{
					fill: new SolidFill("#FFFFFF"),
					matrix: new Matrix()
				};
		}
		
	}
	
	function loadShapeStroke(stroke:HtmlNodeElement) : IStroke
	{
		var isHairline = stroke.getAttr("solidStyle") == "hairline";
		var colorElem = stroke.findOne(">fill>SolidColor");
		switch (stroke.name)
		{
			case "SolidStroke":
				return new SolidStroke
				(
					ColorTools.colorToString(colorElem.getAttr("color", "#000000"), colorElem.getAttr("alpha", 1.0)),
					!isHairline ? stroke.getAttr("weight", 1.0) : 1.0,
					stroke.getAttr("caps", "round"),
					stroke.getAttr("joins", "round"),
					stroke.getAttr("miterLimit", 3.0),
					isHairline
				);
			
			case _:
				log("WARNING: unknow stroke type '" + stroke.name + "'.");
				return new SolidStroke("#000000");
		}
	}
	
	function loadRegPoint(dest:{ regX:Float, regY:Float }, point:HtmlNodeElement)
	{
		if (point != null)
		{
			dest.regX = point.getAttr("x", 0);
			dest.regY = point.getAttr("y", 0);
		}
	}
	
	function loadText(text:HtmlNodeElement, parentMatrix:Matrix) : TextElement
	{
		var r = new TextElement
		(
			text.getAttr("name", ""),
			text.getAttr("width",  0.0) + 4.0,
			text.getAttr("height", 0.0) + 4.0,
			text.getAttr("isSelectable", true),
			false,
			TextRun.optimize(text.find(">textRuns>DOMTextRun").map(function(run) return loadTextRun(run)))
		);	
		r.matrix = MatrixParser.load(text.findOne(">matrix>Matrix"), 1.0, -2 + text.getAttr("left", 0.0), -2).prependMatrix(parentMatrix);
		loadRegPoint(r, text.findOne(">transformationPoint>Point"));
		return r;
	}
	
	function loadTextRun(textRun:HtmlNodeElement) : TextRun
	{
		var textAttrs = textRun.findOne(">textAttrs>DOMTextAttrs");
		
		var face = textAttrs.getAttr("face");
		if (!fontMap.exists(face))
		{
			var font = fontConvertor.convert(face);
			fontMap.set(face, font);
			log("FONT MAP: " + face +" -> " + font.face + " / " + (font.style != "" ? font.style : "regular"));
		}
		
		var font = fontMap.get(face);
		
		return TextRun.create
		(
			Utf8.htmlUnescape(textRun.findOne(">characters").innerHTML).replace("\r", "\n"),
			textAttrs.getAttr("fillColor", "#000000"),
			font.face,
			font.style,
			textAttrs.getAttrFloat("size", 12.0),
			textAttrs.getAttr("alignment", "left"),
			0,
			"#000000",
			textAttrs.getAttrBool("autoKern", false),
			textAttrs.getAttrFloat("letterSpacing", 0),
			textAttrs.getAttrFloat("lineSpacing", 2)
		);
	}
	
	function loadColorEffect(color:HtmlNodeElement) : ColorEffect
	{
		if (color == null) return null;
		
		if (color.hasAttribute("brightness"))
		{
			return new ColorEffectBrightness(color.getAttr("brightness", 1.0));
		}
		
		if (color.hasAttribute("tintMultiplier"))
		{
			return new ColorEffectTint(color.getAttr("tintColor"), color.getAttr("tintMultiplier", 1.0));
		}
		
		var props =
		[
			"alphaMultiplier", "redMultiplier", "greenMultiplier", "blueMultiplier",
			"alphaOffset", "redOffset", "greenOffset", "blueOffset"
		];
		var attrs = Std.array(color.getAttributesAssoc().keys());
		var propCount = attrs.count(function(s) return props.has(s));
		if (color.hasAttribute("alphaMultiplier") && propCount == 1)
		{
			return new ColorEffectAlpha(color.getAttr("alphaMultiplier", 1.0));
		}
		else
		if (propCount > 0)
		{
			return new ColorEffectAdvanced
			(
				color.getAttr("alphaMultiplier", 1.0),
				color.getAttr("redMultiplier", 1.0),
				color.getAttr("greenMultiplier", 1.0),
				color.getAttr("blueMultiplier", 1.0),
				color.getAttr("alphaOffset", 0.0),
				color.getAttr("redOffset", 0.0),
				color.getAttr("greenOffset", 0.0),
				color.getAttr("blueOffset", 0.0)
			);
		}
		return null;
	}
	
	function loadFilter(filter:HtmlNodeElement) : FilterDef
	{
		if (filter == null) return null;
		
		var params = filter.getAttributesObject();
		
		fixFilterParamFloat(params, "strength", 100, function(k) return Math.round(k * 100));
		fixFilterParamFloat(params, "blurX",    10,  function(k) return k * 2);
		fixFilterParamFloat(params, "blurY",    10,  function(k) return k * 2);
		
		filter.name = switch (filter.name)
		{
			case "BlurFilter": "BoxBlurFilter";
			case _: filter.name;
		};
		
		return new FilterDef(filter.name, params);
	}
	
	function parseMotionTweenRotate(motionTweenRotate:String, motionTweenRotateTimes:Int) : Int
	{
		switch (motionTweenRotate)
		{
			case "clockwise": return motionTweenRotateTimes;
			case "counter-clockwise": return -motionTweenRotateTimes;
			case _: return 0;
		}
	}
	
	function loadLinkage(item:InstancableItem, node:HtmlNodeElement)
	{
		if (node.getAttr("linkageExportForAS", false))
		{
			item.linkedClass = node.getAttr("linkageClassName", "");
			
			var linkageIdentifier = node.getAttr("linkageIdentifier", "");
			if (linkageIdentifier != "")
			{
				log("WARNING: linkage identifier is not supported (symbol '" + item.namePath + "')");
				if (item.linkedClass == "") item.linkedClass = linkageIdentifier;
			}
		}
	}
	
	function fixFilterParamFloat(params:Dynamic, name:String, defValue:Float, f:Float->Float) : Void
	{
		Reflect.setField
		(
			params,
			name,
			Reflect.hasField(params, name) ? f(Std.parseFloat(Reflect.field(params, name))) : defValue
		);
	}
}
