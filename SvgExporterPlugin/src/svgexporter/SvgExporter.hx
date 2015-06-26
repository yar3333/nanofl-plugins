package svgexporter;

import nanofl.engine.ArrayRO;
import nanofl.engine.elements.Element;
import nanofl.engine.elements.GroupElement;
import nanofl.engine.elements.Instance;
import nanofl.engine.elements.ShapeElement;
import nanofl.engine.elements.TextElement;
import nanofl.engine.Layer;
import nanofl.engine.Library;
import nanofl.engine.libraryitems.MovieClipItem;
import nanofl.engine.XmlWriter;
import svgexporter.ShapeExporter;
import svgexporter.SvgExporter;
using Slambda;

class SvgExporter
{
	var library : Library;
	
	var shapeExporter = new ShapeExporter();
	var layerItems = new Map<Layer, String>();
	
	public function new(library:Library)
	{
		this.library = library;
	}
	
	public function export(xml:XmlWriter)
	{
		var scene = library.getSceneItem();
		var items = library.getItems();
		
		var svgClipPaths = new Array<MovieClipItem>();
		var svgGroups = new Array<MovieClipItem>();
		
		xml.begin("defs");
			
			iterateMovieClipThree
			(
				scene,
				
				function(mc:MovieClipItem, insideMask:Bool)
				{
					if (insideMask) { if (svgClipPaths.indexOf(mc) < 0) svgClipPaths.push(mc); }
					else            { if (svgGroups.indexOf(mc) < 0) svgGroups.push(mc); }
				},
				
				function(shape:ShapeElement, insideMask:Bool)
				{
					if (!insideMask) shapeExporter.exportGradients(shape, xml);
				}
			);
			
			for (mc in svgClipPaths) exportLayersAsClipPaths(mc, xml);
			for (mc in svgClipPaths) exportSvgClipPath(mc, xml);
			for (mc in [scene].concat(svgGroups)) exportLayersAsClipPaths(mc, "mask", xml);
			for (mc in svgGroups) exportSvgGroup(mc, xml);
			
		xml.end();
		
		exportSvgGroup(scene, xml);
	}
	
	function exportLayersAsClipPaths(mc:MovieClipItem, ?layerType:String, xml:XmlWriter)
	{
		for (i in 0...mc.layers.length)
		{
			var layer = mc.layers[i];
			if (!layerItems.exists(layer) && (layerType == null || layer.type == layerType) && layer.keyFrames.length > 0)
			{
				var layerID = mc.namePath + "_layer" + i;
				layerItems.set(layer, layerID);
				
				xml.begin("clipPath").attr("id", layerID);
				
				for (element in layer.keyFrames[0].elements)
				{
					exportElement(element, xml);
				}
				
				xml.end();
			}
		}
	}
	
	function exportSvgGroup(mc:MovieClipItem, xml:XmlWriter)
	{
		xml.begin("g").attr("id", mc.namePath);
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
		xml.end();
	}
	
	function exportSvgClipPath(mc:MovieClipItem, xml:XmlWriter)
	{
		xml.begin("clipPath").attr("id", mc.namePath);
		for (layer in mc.layers)
		{
			if (layer.type == "normal" && layer.keyFrames.length > 0)
			{
				xml.begin("use");
					xml.attr("title", layer.name);
					xml.attr("xlink:href", "#" + layerItems.get(layer));
					if (layer.parentLayer != null && layer.parentLayer.type == "mask")
					{
						xml.attr("clip-path", "url(#" + layerItems.get(layer.parentLayer) + ")");
					}
				xml.end();
			}
		}
		xml.end();
	}
	
	function exportElement(element:Element, xml:XmlWriter)
	{
		if (Std.is(element, Instance))
		{
			var instance : Instance = cast element;
			xml.begin("use");
				if (!instance.matrix.isIdentity())
				{
					if (instance.matrix.a == 1 && instance.matrix.b == 0 && instance.matrix.c == 0 && instance.matrix.d == 1)
					{
						xml.attr("x", instance.matrix.tx);
						xml.attr("y", instance.matrix.ty);
					}
					else
					{
						xml.attr("transform", "matrix(" + instance.matrix.toArray().join(",") + ")");
					}
				}
				xml.attr("xlink:href", "#" + instance.symbol.namePath);
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
			shapeExporter.exportPaths((cast element:ShapeElement), xml);
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
	
	function iterateMovieClipThree(item:MovieClipItem, ?layerType:String, ?onMovieClip:MovieClipItem->Bool->Void, ?onShape:ShapeElement->Bool->Void, insideMask=false)
	{
		for (layer in (cast item:MovieClipItem).layers)
		{
			if (layerType == null || layer.type == layerType)
			{
				if (layer.keyFrames.length > 0)
				{
					if (onShape != null)
					{
						var shape = layer.keyFrames[0].getShape(false);
						if (shape != null) onShape(shape, insideMask || layerType == "mask");
					}
					
					iterateMovieClipThreeInner(layer.keyFrames[0].elements, layerType, onMovieClip, onShape, insideMask || layerType == "mask");
				}
			}
		}
	}
	
	function iterateMovieClipThreeInner(elements:ArrayRO<Element>, ?layerType:String, ?onMovieClip:MovieClipItem->Bool->Void, ?onShape:ShapeElement->Bool->Void, insideMask:Bool)
	{
		for (element in elements)
		{
			if (Std.is(element, GroupElement))
			{
				iterateMovieClipThreeInner((cast element:GroupElement).getChildren(), layerType, onMovieClip, onShape, insideMask);
			}
			else
			if (Std.is(element, Instance) && Std.is((cast element:Instance).symbol, MovieClipItem))
			{
				if (onMovieClip != null) onMovieClip((cast asInstance(element).symbol : MovieClipItem), insideMask);
				iterateMovieClipThree((cast asInstance(element).symbol : MovieClipItem), layerType, onMovieClip, onShape, insideMask);
			}
		}
	}
	
	static inline function asInstance(element:Element) : Instance return cast element;
}