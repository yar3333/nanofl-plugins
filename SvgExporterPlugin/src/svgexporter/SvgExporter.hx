package svgexporter;

import nanofl.engine.libraryitems.LibraryItem;
import nanofl.engine.libraryitems.MovieClipItem;
import nanofl.engine.libraryitems.BitmapItem;
import nanofl.engine.libraryitems.FontItem;
import nanofl.engine.libraryitems.SoundItem;
import nanofl.engine.libraryitems.SpriteItem;
import stdlib.Uuid;
import nanofl.engine.elements.Instance;
import nanofl.engine.elements.GroupElement;
import nanofl.engine.elements.ShapeElement;
import nanofl.engine.elements.TextElement;
import nanofl.engine.DocumentProperties;
import nanofl.engine.elements.Element;
import nanofl.engine.FileApi;
import nanofl.engine.Library;
import nanofl.engine.Plugins;
import nanofl.ide.plugins.IExporterPlugin;
import nanofl.engine.XmlWriter;
import nanofl.engine.fills.LinearFill;
import nanofl.engine.fills.RadialFill;
import nanofl.engine.fills.IFill;
import nanofl.engine.strokes.IStroke;
import svgexporter.ShapeExporter;
import svgexporter.SvgExporter;
using Slambda;

class SvgExporter
{
	var library:Library;
	
	var shapeExporter = new ShapeExporter();
	
	public function new(library:Library) 
	{
		this.library = library;
	}
	
	public function export(xml:XmlWriter)
	{
		xml.begin("defs");
			var items = library.getItems();
			exportGradients(library.getSceneItem(), xml);
			for (item in items) exportGradients(item, xml);
			for (item in items) exportItem(item, xml);
		xml.end();
		
		exportItem(library.getSceneItem(), xml);
	}
	
	function exportGradients(item:LibraryItem, xml:XmlWriter)
	{
		if (Std.is(item, MovieClipItem))
		{
			for (layer in (cast item:MovieClipItem).layers)
			{
				if (layer.keyFrames.length > 0)
				{
					shapeExporter.exportGradients(layer.keyFrames[0].getShape(false), xml);
				}
			}
		}
	}
	
	function exportItem(item:LibraryItem, xml:XmlWriter)
	{
		if (Std.is(item, MovieClipItem))
		{
			var mc : MovieClipItem = cast item;
			xml.begin("g").attr("id", mc.namePath);
			for (layer in mc.layers)
			{
				xml.begin("g").attr("title", layer.name);
				if (layer.keyFrames.length > 0)
				{
					for (element in layer.keyFrames[0].elements)
					{
						exportElement(element, xml);
					}
				}
				xml.end();
			}
			xml.end();
		}
		else
		{
			trace("Library item '" + item.namePath + "' of type '" + item.getType() + "' is not supported.");
		}
	}
	
	function exportElement(element:Element, xml:XmlWriter)
	{
		if (Std.is(element, Instance))
		{
			var instance : Instance = cast element;
			xml.begin("use")
				.attr("transform", "matrix(" + instance.matrix.toArray().join(",") + ")")
				.attr("xlink:href", "#" + instance.symbol.namePath)
			.end();
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
		else
		if (Std.is(element, TextElement))
		{
			var text : TextElement = cast element;
		}
		else
		{
			trace("Unsupported element: " + element.toString());
		}
	}
}