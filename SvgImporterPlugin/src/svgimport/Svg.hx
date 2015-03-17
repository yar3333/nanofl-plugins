package svgimport;

import htmlparser.HtmlNodeElement;
import svgimport.gradients.GradientType;
using StringTools;

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
		
		width = 400.0;
		height = 400.0;
		
		if (svg.hasAttribute("width") && !svg.getAttribute("width").endsWith("%")
		 && svg.hasAttribute("height") && !svg.getAttribute("height").endsWith("%"))
		{
			width = XmlTools.getFloatStyle(svg, "width", null, 400.0);
			height = XmlTools.getFloatStyle(svg, "height", null, 400.0);
		}
		else
		if (svg.hasAttribute("viewBox"))
		{
			var viewBoxValues = ~/\s+/g.split(svg.getAttribute("viewBox"));
			if (viewBoxValues.length == 4)
			{
				width = Std.parseFloat(viewBoxValues[2]);
				height = Std.parseFloat(viewBoxValues[3]);
			}
		}
		
		super(svg, null, new Map<String, SvgElement>(), new Map<String, GradientType>());
	}
	
}