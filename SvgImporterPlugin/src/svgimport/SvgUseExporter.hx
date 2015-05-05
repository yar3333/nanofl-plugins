package svgimport;

import nanofl.engine.elements.Instance;
import nanofl.engine.Library;

class SvgUseExporter extends BaseExporter
{
	var use : SvgUse;
	
	public function new(svg:Svg, library:Library, use:SvgUse)
	{
		super(svg, library);
		this.use = use;
	}
	
	public function exportAsElement() : Instance
	{
		return applyMaskToElement(exportAsElementInner(), use.clipPathID, getNextFreeID(use.groupID));
	}
	
	function exportAsElementInner() : Instance
	{
		var namePath = use.groupID;
		
		if (use.styles.keys().hasNext())
		{
			var element = svg.elements.get(use.groupID);
			if (element != null)
			{
				switch (element)
				{
					case SvgElement.DisplayGroup(base):
						var g = new SvgGroup(svg, base.node, use.styles, getNextFreeID(base.id));
						namePath = new SvgGroupExporter(svg, library, g).exportToLibrary().namePath;
						
					case SvgElement.DisplayPath(base):
						var p = new SvgPath(svg, base.node, use.styles, getNextFreeID(base.id));
						namePath = new SvgPathExporter(svg, library, p).exportToLibrary().namePath;
						
					case _:
				}
			}
			else
			{
				trace("WARNING: Element '" + use.groupID + "' is not found.");
			}
		}
		
		var instance = new Instance(namePath);
		instance.matrix = use.matrix.clone().appendMatrix(getSvgElementMatrix(svg.elements.get(use.groupID)));
		return instance;
	}
	
	function getSvgElementMatrix(element:SvgElement) : Matrix
	{
		if (element == null) return new Matrix();
		
		switch (element)
		{
			case SvgElement.DisplayGroup(g): return g.matrix;
			case SvgElement.DisplayPath(p): return p.matrix;
			case _: return new Matrix();
		}
	}}