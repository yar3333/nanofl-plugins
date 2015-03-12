package svgimport;

import nanofl.engine.elements.Element;
import nanofl.engine.elements.Instance;
import nanofl.engine.elements.ShapeElement;
import nanofl.engine.KeyFrame;
import nanofl.engine.Layer;
import nanofl.engine.Library;
import nanofl.engine.libraryitems.MovieClipItem;
import svgimport.SvgElement;
import svgimport.SvgGroup;
using StringTools;

class SvgGroupExporter
{
	public static function run(group:SvgGroup, library:Library, ?name:String) : MovieClipItem
	{
		var layers = [];
		
		for (child in group.children)
		{
			switch (child)
			{
				case SvgElement.DisplayGroup(g):
					if (g.id == "" || !library.hasItem(g.id))
					{
						var item = SvgGroupExporter.run(g, library);
						if (item != null)
						{
							var instance = new Instance(item.namePath);
							instance.matrix = g.matrix;
							addElement(layers, instance, g.visible);
						}
					}
					
				case SvgElement.DisplayPath(path):
					addElement(layers, path.toElement());
					
				case SvgElement.DisplayText(text):
					addElement(layers, text.toElement());
					
				case SvgElement.DisplayUse(groupID, matrix, visible):
					var instance = new Instance(groupID);
					instance.matrix = matrix;
					addElement(layers, instance, visible);
			}
		}
		
		var mc = new MovieClipItem(name != null ? name : (group.id != "" ? group.id : getNextLibraryItemAutoName(library)));
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
	
	static function getNextLibraryItemAutoName(library:Library) : String
	{
		var i = 0; while (library.hasItem("auto_" + i)) i++;
		return "auto_" + i;
	}
}