package svgexporter;

import htmlparser.XmlBuilder;
import nanofl.engine.elements.Element;
import nanofl.engine.elements.Elements;
import nanofl.engine.elements.GroupElement;
import nanofl.engine.elements.Instance;
import nanofl.engine.elements.ShapeElement;
import nanofl.engine.geom.Matrix;
import nanofl.engine.Layer;
import nanofl.engine.Library;
import nanofl.engine.libraryitems.MovieClipItem;
import nanofl.ide.MovieClipItemTools;
import svgexporter.ShapeExporter;
import svgexporter.SvgExporter;
using Slambda;

class SvgExporter
{
	var library : Library;
	
	var shapeExporter = new ShapeExporter();
	var layerItems = new Map<Layer, String>();
	var shapePaths = new Map<ShapeElement, Array<String>>();
	
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
			
			for (item in sceneWithItems)
			{
				for (layer in item.layers) if (layer.keyFrames.length > 0)
				{
					var shape = layer.keyFrames[0].getShape(false);
					if (shape != null)
					{
						shapeExporter.exportGradients(shape, xml);
					}
				}
			}
			
			for (item in sceneWithItems)
			{
				MovieClipItemTools.findShapes
				(
					item,
					false,
					function(shape:ShapeElement, e)
					{
						if (e.insideMask && !shapePaths.exists(shape))
						{
							shapePaths.set(shape, shapeExporter.export(e.item.namePath + "_layer" + e.layerIndex + "_shape", shape, xml));
						}
					}
				);
			}
			
			for (item in sceneWithItems)
			{
				exportMaskLayers(item, xml);
			}
			
			for (item in items)
			{
				exportSvgGroup(item, xml);
			}
			
		xml.end();
		
		exportMovieClipLayers(scene, xml);
	}

	function exportMaskLayers(item:MovieClipItem, xml:XmlBuilder)
	{
		for (i in 0...item.layers.length)
		{
			var layer = item.layers[i];
			if (!layerItems.exists(layer) && layer.type == "mask" && layer.keyFrames.length > 0)
			{
				var layerID = item.namePath + "_layer" + i;
				layerItems.set(layer, layerID);
				
				xml.begin("clipPath").attr("id", layerID);
				
				for (element in Elements.expandGroups(layer.keyFrames[0].elements))
				{
					if (Std.is(element, ShapeElement))
					{
						exportExistShapeElement((cast element:ShapeElement), null, xml);
					}
					else
					if (Std.is(element, Instance) && Std.is(asInstance(element).symbol, MovieClipItem))
					{
						MovieClipItemTools.findShapes
						(
							(cast asInstance(element).symbol:MovieClipItem),
							false,
							element.matrix,
							function(shape, e) exportExistShapeElement(shape, e.matrix, xml)
						);
					}
				}
				
				xml.end();
			}
		}
	}
	
	function exportSvgGroup(item:MovieClipItem, xml:XmlBuilder)
	{
		xml.begin("g").attr("id", item.namePath);
			exportMovieClipLayers(item, xml);
		xml.end();
	}
	
	function exportMovieClipLayers(item:MovieClipItem, xml:XmlBuilder)
	{
		for (layer in item.layers)
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