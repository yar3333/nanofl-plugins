package svgimport;

import nanofl.engine.elements.Element;
import nanofl.engine.elements.Instance;
import nanofl.engine.KeyFrame;
import nanofl.engine.Layer;
import nanofl.engine.Library;
import nanofl.engine.libraryitems.LibraryItem;
import nanofl.engine.libraryitems.MovieClipItem;
import svgimport.SvgElement;

class BaseExporter
{
	var svg : Svg;
	var library : Library;
	
	public function new(svg:Svg, library:Library)
	{
		this.svg = svg;
		this.library = library;
	}

	function elementsToLibraryItem(elements:Array<Element>, id:String) : MovieClipItem
	{
		stdlib.Debug.assert(id != null && id != "", "ID must not be empty (" + id + ").");
		var mc = new MovieClipItem(id);
		mc.addLayer(new Layer("auto"));
		mc.layers[0].addKeyFrame(new KeyFrame(elements));
		library.addItem(mc);
		return mc;
	}
	
	function applyMaskToElement<T:Element>(element:T, maskID:String, prefixID:String) : T
	{
		if (element == null) return null;
		
		if (maskID != null)
		{
			if (!Std.is(element, Instance) || cast(library.getItem(cast(element, Instance).namePath), MovieClipItem).layers.length > 1)
			{
				element = cast elementsToLibraryItem([element], getNextFreeID(prefixID)).newInstance();
			}
			
			stdlib.Debug.assert(Std.is(element, Instance));
			stdlib.Debug.assert(library.getItem(cast(element, Instance).namePath) != null);
			
			var item = cast(library.getItem(cast(element, Instance).namePath), MovieClipItem);
			stdlib.Debug.assert(item != null);
			
			addMaskLayerToMovieClipItem(item, maskID);
		}
		
		return element;
	}
	
	function wrapMovieClipItemWithMask(item:MovieClipItem, maskID:String, id:String) : MovieClipItem
	{
		if (maskID == null) return item;
		
		var r = elementsToLibraryItem([item.newInstance()], id);
		
		addMaskLayerToMovieClipItem(r, maskID);
		library.addItem(r);
		
		return r;
	}
	
	function addMaskLayerToMovieClipItem(item:MovieClipItem, maskID:String) : Void
	{
		if (maskID != null)
		{
			//trace("addMaskLayerToMovieClipItem maskID = " + maskID);
			
			var maskLayer = new Layer("auto_clip-path", "mask", true, true);
			var maskItem = library.hasItem(maskID)
				? library.getItem(maskID)
				: exportSvgElementToLibrary(svg.elements.get(maskID));
			
			maskLayer.addKeyFrame(new KeyFrame([ cast(maskItem, MovieClipItem).newInstance() ]));
			
			stdlib.Debug.assert(item.layers.length == 1);
			
			item.addLayersBlock([maskLayer], 0);
			item.layers[1].parentIndex = 0;
			item.layers[1].locked = true;
		}
	}
	
	function exportSvgElementToLibrary(element:SvgElement) : MovieClipItem
	{
		return switch (element)
		{
			case SvgElement.DisplayGroup(g): new SvgGroupExporter(svg, library, g).exportToLibrary();
			case SvgElement.DisplayPath(p): new SvgPathExporter(svg, library, p).exportToLibrary();
			case _: null;
		};
	}
	
	function getNextFreeID(prefix="") : String
	{
		if (prefix == "") prefix = "auto";
		
		prefix += "_";
		
		var i = -1;
		var s : String;
		
		do s = prefix + (++i)
		while (svg.elements.exists(s) || library.hasItem(s) || svg.usedIDs.indexOf(s) >= 0);
		
		svg.usedIDs.push(s);
		
		return s;
	}
}