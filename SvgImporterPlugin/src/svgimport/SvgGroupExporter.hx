package svgimport;

import nanofl.engine.elements.Element;
import nanofl.engine.elements.Instance;
import nanofl.engine.elements.ShapeElement;
import nanofl.engine.KeyFrame;
import nanofl.engine.Layer;
import nanofl.engine.Library;
import nanofl.engine.libraryitems.MovieClipItem;
import svgimport.gradients.GradientType;
import svgimport.SvgElement;
import svgimport.SvgGroup;
using StringTools;

class SvgGroupExporter
{
	public static function run(group:SvgGroup, library:Library) : MovieClipItem
	{
		var layers = [];
		
		for (child in group.children)
		{
			switch (child)
			{
				case SvgElement.DisplayGroup(g):
					var item = !library.hasItem(g.id)
						? SvgGroupExporter.run(g, library)
						: library.getItem(g.id);
					var instance = new Instance(item.namePath);
					instance.matrix = g.matrix;
					addElement(layers, instance, g.visible);
					
				case SvgElement.DisplayPath(path):
					addElement(layers, path.toElement());
					
				case SvgElement.DisplayText(text):
					addElement(layers, text.toElement());
					
				case SvgElement.DisplayUse(id, matrix, styles, visible):
					if (styles.keys().hasNext())
					{
						var element = group.elements.get(id);
						if (element != null)
						{
							switch (element)
							{
								case SvgElement.DisplayGroup(base):
									var g = new SvgGroup(base.node, base.svgWidth, styles, group.elements, group.gradients, getNextFreeID(group.elements, library, base.id));
									SvgGroupExporter.run(g, library);
									id = g.id;
									
								case SvgElement.DisplayPath(base):
									var p = new SvgPath(base.node, styles, group.elements, group.gradients, getNextFreeID(group.elements, library, base.id));
									var libraryItem = p.toLibraryItem();
									if (libraryItem != null) library.addItem(libraryItem);
									id = p.id;
									
								case _:
							}
						}
						else
						{
							trace("WARNING: Element '" + id + "' is not found.");
						}
					}
					
					var instance = new Instance(id);
					instance.matrix = matrix.clone().appendMatrix(getElementMatrix(group.elements.get(id)));
					addElement(layers, instance, visible);
			}
		}
		
		var mc = new MovieClipItem(group.id != "" ? group.id : getNextFreeID(group.elements, library));
		layers.reverse();
		for (layer in layers) mc.addLayer(layer);
		library.addItem(mc);
		
		return mc;
	}
	
	static function addElement(layers:Array<Layer>, element:Element, visible=true) : Void
	{
		if (element == null) return;
		
		if (layers.length == 0) createLayerWithFrame(layers, "auto_" + layers.length);
		var frame = layers[layers.length - 1].keyFrames[0];
		
		if ((frame.elements.length > 0 && Std.is(element, ShapeElement)) || layers[layers.length - 1].visible != visible)
		{
			frame = createLayerWithFrame(layers, "auto_" + layers.length, visible);
		}
		
		frame.addElement(element);
	}
	
	static function createLayerWithFrame(layers:Array<Layer>, name:String, visible=true) : KeyFrame
	{
		var layer = new Layer(name, null, visible);
		var keyFrame = new KeyFrame();
		layer.addKeyFrame(keyFrame);
		layers.push(layer);
		return keyFrame;
	}
	
	static function getNextFreeID(elements:Map<String, SvgElement>, library:Library, prefix="auto_") : String
	{
		var i = 0; while (elements.exists(prefix + i) || library.hasItem(prefix + i)) i++;
		return prefix + i;
	}
	
	static function getElementMatrix(elem:SvgElement) : Matrix
	{
		if (elem == null) return new Matrix();
		
		switch (elem)
		{
			case SvgElement.DisplayGroup(g): return g.matrix;
			case _: return new Matrix();
		}
	}
}