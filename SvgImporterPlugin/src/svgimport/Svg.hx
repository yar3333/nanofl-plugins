package svgimport;

class Svg extends SvgGroup
{
	public var height(default, null) : Float;
	public var width(default, null) : Float;
	
	private var gradients : Map<String, Grad>;
	
	public function new(xml:Xml)
	{
		var svg = xml.firstElement();
		
		if (svg == null || (svg.nodeName != "svg" && svg.nodeName != "svg:svg"))
		{
			throw "Not an SVG file (" + (svg == null ? "null" : svg.nodeName) + ")";
		}
		
		gradients = new Map<String, Grad>();
		
		width = XmlTools.getFloatStyle(svg, "width", null, 0.0);
		height = XmlTools.getFloatStyle(svg, "height", null, 0.0);
		
		if (width == 0 && height == 0)
		{
			width = height = 400;
			
			if (svg.exists("viewBox"))
			{
				var viewBoxValues = ~/\s+/g.split(svg.get("viewBox"));
				if (viewBoxValues.length == 4)
				{
					width = Std.parseFloat(viewBoxValues[2]);
					height = Std.parseFloat(viewBoxValues[3]);
				}
			}
		}
		else if (width  == 0) width = height;
		else if (height == 0) height = width;
		
		super(svg, new Matrix(), null, gradients);
	}
	
	private function dumpGroup(g:SvgGroup, indent:String)
	{
		trace(indent + "Group:" + g.name);
		indent += "  ";
		
		for (e in g.children) {
			
			switch (e)
			{
				case SvgElement.DisplayPath(path) : trace (indent + "Path" + "  " + path.matrix);
				case SvgElement.DisplayGroup(group) : dumpGroup (group, indent+"   ");
				case SvgElement.DisplayText(text) : trace (indent + "Text " + text.text);
			}
		}
	}
}