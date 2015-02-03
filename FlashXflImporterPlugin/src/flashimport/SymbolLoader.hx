package flashimport;

import htmlparser.HtmlNodeElement;
import htmlparser.XmlDocument;
import models.common.coloreffects.ColorEffect;
import models.common.coloreffects.ColorEffectAdvanced;
import models.common.coloreffects.ColorEffectAlpha;
import models.common.coloreffects.ColorEffectBrightness;
import models.common.coloreffects.ColorEffectTint;
import models.common.ColorTools;
import models.common.elements.Element;
import models.common.elements.GroupElement;
import models.common.elements.Instance;
import models.common.elements.ShapeElement;
import models.common.elements.TextElement;
import models.common.FileApi;
import models.common.fills.BitmapFill;
import models.common.fills.IFill;
import models.common.fills.LinearFill;
import models.common.fills.RadialFill;
import models.common.fills.SolidFill;
import models.common.FilterDef;
import models.common.geom.Matrix;
import models.common.KeyFrame;
import models.common.Layer;
import models.common.Library;
import models.common.libraryitems.BitmapItem;
import models.common.libraryitems.InstancableItem;
import models.common.libraryitems.LibraryItem;
import models.common.libraryitems.MovieClipItem;
import models.common.strokes.IStroke;
import models.common.strokes.SolidStroke;
import models.common.tweens.MotionTween;
import nanofl.TextRun;
import stdlib.Std;
import stdlib.Utf8;
using htmlparser.HtmlParserTools;
using StringTools;
using Lambda;

class SymbolLoader
{
	var fileApi : FileApi;
	var doc : XmlDocument;
	var srcLibDir : String;
	var library : Library;
	var log : Dynamic->Void;
	
	var fontMap = new Map<String, { face:String, style:String }>();
	var morphingNotSupported = new Array<String>();
	
	public function new(fileApi:FileApi, doc:XmlDocument, srcLibDir:String, library:Library, ?log:Dynamic->Void)
	{
		this.fileApi = fileApi;
		this.doc = doc;
		this.srcLibDir = srcLibDir;
		this.library = library;
		this.log = log != null ? log : function(v) {};
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
		var fills = element.find(">fills>FillStyle>*").map(function(fill) return loadShapeFill(fill));
		var contours = [];
		for (edge in element.find(">edges>Edge"))
		{
			var contour = new ContourParser(edge);
			if ((contour.fillStyle0 != null || contour.fillStyle1 != null || contour.strokeStyle != null) && contour.drawOps.length > 0)
			{
				contours.push(contour);
			}
		}
		var contoursExporter = new ContoursExporter(strokes, fills);
		new ContoursParser(contours).parse(contoursExporter);
		var p = contoursExporter.export();
		
		var shape = new ShapeElement(p.edges, p.polygons);
		shape.matrix = MatrixParser.load(element.findOne(">matrix>Matrix")).prependMatrix(parentMatrix);
		loadRegPoint(shape, element.findOne(">transformationPoint>Point"));
		shape.ensureNoTransform();
		
		return shape;
	}
	
	function loadShapeFill(fill:HtmlNodeElement) : IFill
	{
		switch (fill.name)
		{
			case "SolidColor":
				return new SolidFill(ColorTools.colorToString(fill.getAttr("color", "#000000"), fill.getAttr("alpha", 1.0)));
				
			case "LinearGradient":
				var gradients = fill.find(">GradientEntry");
				return new LinearFill
				(
					gradients.map(function(g) return ColorTools.colorToString(g.getAttr("color"), g.getAttr("alpha", 1.0))),
					gradients.map(function(g) return g.getAttr("ratio")),
					MatrixParser.load(fill.findOne(">matrix>Matrix"), 1 / 819.2)
				);
				//writeRegPoint(element.findOne(">transformationPoint>Point"));
				
			case "RadialGradient":
				var gradients = fill.find(">GradientEntry");
				return new RadialFill
				(
					gradients.map(function(g) return ColorTools.colorToString(g.getAttr("color"), g.getAttr("alpha", 1.0))),
					gradients.map(function(g) return g.getAttr("ratio")),
					MatrixParser.load(fill.findOne(">matrix>Matrix"), 1 / 819.2)
				);
				//writeRegPoint(element.findOne(">transformationPoint>Point"));
				
			case "BitmapFill":
				return new BitmapFill
				(
					fill.getAttr("bitmapPath"),
					MatrixParser.load(fill.findOne(">matrix>Matrix"), 20),
					fill.getAttr("bitmapIsClipped", true) ? "no-repeat" : "repeat"
				);
				
			case _:
				log("WARNING: unknow fill type '" + fill.name + "'.");
				return new SolidFill("#FFFFFF");
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
			TextRun.optimize(text.find(">textRuns>DOMTextRun").map(function(run) return loadTextRun(run))),
			new TextRun(null, "#000000", "Times", "", 12, "left", 0, null, null)
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
			var font = FontConvertor.convert(face);
			fontMap.set(face, font);
			log("FONT MAP: " + textAttrs.getAttr("face") +" -> " + font.face + " / " + (font.style != "" ? font.style : "regular"));
		}
		
		var font = fontMap.get(face);
		
		return new TextRun
		(
			Utf8.htmlUnescape(textRun.findOne(">characters").innerHTML).replace("\r", "\n"),
			textAttrs.getAttr("fillColor", "#000000"),
			font.face,
			font.style,
			textAttrs.getAttr("size", 12.0),
			textAttrs.getAttr("alignment"),
			0,
			null,
			null
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
		if (Reflect.hasField(params, "strength"))
		{
			Reflect.setField(params, "strength", Math.round(Std.parseFloat(Reflect.field(params, "strength")) * 100));
		}
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
}
