package svgimport;

import htmlparser.HtmlNodeElement;
import svgimport.gradients.GradientType;

class Svg extends SvgGroup
{
	public var height(default, null) : Float;
	public var width(default, null) : Float;
	
	public function new(xml:HtmlNodeElement)
	{
		var svg = xml.children.length > 0 ? xml.children[0] : null;
		
		if (svg == null || (svg.name != "svg" && svg.name != "svg:svg"))
		{
			throw "Not an SVG file (" + (svg == null ? "null" : svg.name) + ")";
		}
		
		width = XmlTools.getFloatStyle(svg, "width", null, 0.0);
		height = XmlTools.getFloatStyle(svg, "height", null, 0.0);
		
		if (width == 0 && height == 0)
		{
			width = height = 400;
			
			if (svg.hasAttribute("viewBox"))
			{
				var viewBoxValues = ~/\s+/g.split(svg.getAttribute("viewBox"));
				if (viewBoxValues.length == 4)
				{
					width = Std.parseFloat(viewBoxValues[2]);
					height = Std.parseFloat(viewBoxValues[3]);
				}
			}
		}
		else if (width  == 0) width = height;
		else if (height == 0) height = width;
		
		super(svg, null, new Map<String, SvgGroup>(), new Map<String, GradientType>());
	}
	private function dumpGroup(g:SvgGroup, indent:String)
	{
		trace(indent + "Group:" + g.name);
		indent += "  ";
		
		for (e in g.children) {
			
			switch (e)
			{
				case SvgElement.DisplayPath(path):		trace(indent + "Path" + "  " + path.matrix);
				case SvgElement.DisplayGroup(group):	dumpGroup(group, indent+"   ");
				case SvgElement.DisplayText(text):		trace(indent + "Text " + text.text);
				case SvgElement.DisplayUse(id, _, _):	trace(indent + "Use " + id);
			}
		}
	}
}