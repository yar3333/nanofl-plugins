package svgimport;

import htmlparser.HtmlNodeElement;
import nanofl.engine.elements.ShapeElement;
import nanofl.engine.FilterDef;
import nanofl.engine.geom.Bounds;
import svgimport.segments.DrawSegment;
import svgimport.segments.MoveSegment;
import svgimport.segments.QuadraticSegment;
import svgimport.segments.Segment;
import svgimport.SvgElement;
using htmlparser.HtmlParserTools;
using svgimport.XmlTools;
using StringTools;

class SvgFilter
{
	var node : HtmlNodeElement;
	
	public function new(node:HtmlNodeElement)
	{
		this.node = node;
	}
	
	public function export() : FilterDef
	{
		var name = XmlTools.normalizeTag(node.name);
		
		switch (name)
		{
			case "feGaussianBlur":
				var input = node.getAttr("in", "SourceGraphic");
				if (input != "SourceGraphic")
				{
					trace("Filter '" + name + "': 'in' attribute value different to 'SourceGraphic' is not supported.");
					return null;
				}
				
				var stdDeviation = getFloatParams(node.getAttr("stdDeviation"), [0]);
				
				return new FilterDef
				(
					"BlurFilter",
					{
						blurX: stdDeviation[0],
						blurY: stdDeviation[stdDeviation.length > 1 ? 1 : 0]
					}
				);
				
				
			case "feColorMatrix":
				trace("Filter '" + name + "' is unsupported.");
				
			case "feOffset":
				trace("Filter '" + name + "' is unsupported.");
				
			case "feMerge":
				trace("Filter '" + name + "' is unsupported.");
				
			case "feBlend":
				trace("Filter '" + name + "' is unsupported.");
				
			case "feComponentTransfer", 
				 "feComposite",
				 "feConvolveMatrix",
				 "feDiffuseLighting",
				 "feDisplacementMap",
				 "feFlood",
				 "feImage",
				 "feMorphology",
				 "feSpecularLighting",
				 "feTile",
				 "feTurbulence",
				 "feDistantLight",
				 "fePointLight",
				 "feSpotLight":
				trace("Filter '" + name + "' is not supported.");
				
			case _:
				trace("Unknow filter '" + name + "'.");
		}
		
		return null;
	}
	
	function getFloatParams(s:String, defValue:Array<Float>) : Array<Float>
	{
		if (s == null) return defValue;
		s = s.trim();
		if (s == "") return defValue;
		return ~/[ \t\r\n,]+/g.split(s).map(Std.parseFloat);
	}
}