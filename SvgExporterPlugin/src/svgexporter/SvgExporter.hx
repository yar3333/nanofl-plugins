package svgexporter;

import htmlparser.XmlBuilder;
import nanofl.engine.ArrayRO;
import nanofl.engine.elements.Element;
import nanofl.engine.elements.GroupElement;
import nanofl.engine.elements.Instance;
import nanofl.engine.elements.ShapeElement;
import nanofl.engine.geom.Matrix;
import nanofl.engine.KeyFrame;
import nanofl.engine.Layer;
import nanofl.engine.Library;
import nanofl.engine.libraryitems.MovieClipItem;
import svgexporter.ShapeExporter;
import svgexporter.SvgExporter;
using Slambda;

class SvgExporter
{
	var library : Library;
	
	var shapeExporter = new ShapeExporter();
	var layerItems = new Map<Layer, String>();
	var shapePaths = new Map<ShapeElement, Array<String>>();
	var allShapes = [];
	
	public function new(library:Library)
	{
		this.library = library;
	}
	
	public function export(xml:XmlBuilder)
	{
		var scene = library.getSceneItem();
		var items : Array<MovieClipItem> = cast library.getItems().filter.fn(Std.is(_, MovieClipItem));
		var sceneWithItems = [scene].concat(items);
		
		xml.begin("defs");
			
			for (mc in sceneWithItems)
			{
				iterateMovieClipKeyFrames(mc, function(layerIndex:Int, keyFrame:KeyFrame)
				{
					var shape = keyFrame.getShape(false);
					if (shape != null)
					{
						if (allShapes.indexOf(shape) < 0)
						{
							allShapes.push(shape);
						}
						shapeExporter.exportGradients(shape, xml);
					}
				});
			}
			
			for (mc in sceneWithItems)
			{
				findShapes
				(
					mc,
					function(shape:ShapeElement, matrix:Matrix, insideMask:Bool, baseID:String)
					{
						if (insideMask && !shapePaths.exists(shape))
						{
							shapePaths.set(shape, shapeExporter.export(baseID, shape, xml));
						}
					}
				);
			}
			
			for (mc in sceneWithItems)
			{
				exportLayersAsClipPaths(mc, xml);
			}
			
			for (mc in items)
			{
				exportSvgGroup(mc, xml);
			}
			
		xml.end();
		
		exportMovieClipLayers(scene, xml);
	}

	function exportLayersAsClipPaths(mc:MovieClipItem, xml:XmlBuilder)
	{
		for (i in 0...mc.layers.length)
		{
			var layer = mc.layers[i];
			if (!layerItems.exists(layer) && layer.type == "mask" && layer.keyFrames.length > 0)
			{
				var layerID = mc.namePath + "_layer" + i;
				layerItems.set(layer, layerID);
				
				xml.begin("clipPath").attr("id", layerID);
				
				for (element in layer.keyFrames[0].elements)
				{
					if (Std.is(element, ShapeElement))
					{
						exportExistShapeElement((cast element:ShapeElement), null, xml);
					}
					else
					if (Std.is(element, Instance) && Std.is(asInstance(element).symbol, MovieClipItem))
					{
						findShapes
						(
							(cast asInstance(element).symbol:MovieClipItem),
							element.matrix,
							function(shape:ShapeElement, matrix:Matrix, insideMask:Bool, baseID:String)
							{
								exportExistShapeElement(shape, matrix, xml);
							}
						);
					}
				}
				
				xml.end();
			}
		}
	}
	
	function exportSvgGroup(mc:MovieClipItem, xml:XmlBuilder)
	{
		xml.begin("g").attr("id", mc.namePath);
			exportMovieClipLayers(mc, xml);
		xml.end();
	}
	
	function exportMovieClipLayers(mc:MovieClipItem, xml:XmlBuilder)
	{
		for (layer in mc.layers)
		{
			if (layer.type == "normal")
			{
				xml.begin("g").attr("title", layer.name);
				if (layer.keyFrames.length > 0)
				{
					if (layer.parentLayer != null && layer.parentLayer.type == "mask")
					{
						xml.attr("clip-path", "url(#" + layerItems.get(layer.parentLayer) + ")");
					}
					
					for (element in layer.keyFrames[0].elements)
					{
						exportElement(element, xml);
					}
				}
				xml.end();
			}
		}
	}
	
	function exportElement(element:Element, xml:XmlBuilder)
	{
		if (Std.is(element, Instance))
		{
			var instance : Instance = cast element;
			xml.begin("use");
				xml.attr("xlink:href", "#" + instance.symbol.namePath);
				exportMatrix(instance.matrix, xml);
			xml.end();
		}
		else
		if (Std.is(element, GroupElement))
		{
			var group : GroupElement = cast element;
			for (e in group.getChildren())
			{
				exportElement(e, xml);
			}
		}
		else
		if (Std.is(element, ShapeElement))
		{
			if (shapePaths.exists((cast element:ShapeElement)))
			{
				exportExistShapeElement((cast element:ShapeElement), null, xml);
			}
			else
			{
				shapeExporter.export(null, (cast element:ShapeElement), xml);
			}
		}
		//else
		//if (Std.is(element, TextElement))
		//{
		//	var text : TextElement = cast element;
		//}
		else
		{
			trace("Unsupported element: " + element.toString());
		}
	}
	
	function exportExistShapeElement(shape:ShapeElement, matrix:Matrix, xml:XmlBuilder)
	{
		for (pathID in shapePaths.get(shape))
		{
			xml.begin("use");
				xml.attr("xlink:href", "#" + pathID);
				if (matrix != null) exportMatrix(matrix, xml);
			xml.end();
		}
	}
	
	function findShapes(item:MovieClipItem, ?matrix:Matrix, callb:ShapeElement->Matrix->Bool->String->Void, insideMask=false)
	{
		if (matrix == null) matrix = new Matrix();
		
		iterateMovieClipKeyFrames(item, function(layerIndex:Int, keyFrame:KeyFrame)
		{
			var localInsideMask = insideMask || item.layers[layerIndex].type == "mask";
			
			var shape = keyFrame.getShape(false);
			if (shape != null) callb(shape, matrix, localInsideMask, item.namePath + "_layer" + layerIndex + "_shape");
			
			findShapesInner(keyFrame.elements, callb, localInsideMask, matrix);
		});
	}
	
	function findShapesInner(elements:ArrayRO<Element>, callb:ShapeElement->Matrix->Bool->String->Void, insideMask:Bool, matrix:Matrix)
	{
		for (element in elements)
		{
			if (Std.is(element, GroupElement))
			{
				findShapesInner((cast element:GroupElement).getChildren(), callb, insideMask, matrix);
			}
			else
			if (Std.is(element, Instance) && Std.is((cast element:Instance).symbol, MovieClipItem))
			{
				var m = matrix.clone();
				m.appendMatrix(asInstance(element).matrix);
				findShapes((cast asInstance(element).symbol:MovieClipItem), m, callb, insideMask);
			}
		}
	}
	
	function iterateMovieClipKeyFrames(item:MovieClipItem, callb:Int->KeyFrame->Void)
	{
		for (i in 0...(cast item:MovieClipItem).layers.length)
		{
			var layer = (cast item:MovieClipItem).layers[i];
			if (layer.keyFrames.length > 0)
			{
				callb(i, layer.keyFrames[0]);
			}
		}
	}
	
	function exportMatrix(matrix:Matrix, xml:XmlBuilder)
	{
		if (!matrix.isIdentity())
		{
			if (matrix.a == 1 && matrix.b == 0 && matrix.c == 0 && matrix.d == 1)
			{
				xml.attr("x", matrix.tx);
				xml.attr("y", matrix.ty);
			}
			else
			{
				xml.attr("transform", "matrix(" + matrix.toArray().join(",") + ")");
			}
		}
	}
	
	static inline function asInstance(element:Element) : Instance return cast element;
}