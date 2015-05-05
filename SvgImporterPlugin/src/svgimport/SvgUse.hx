package svgimport;

import htmlparser.HtmlNodeElement;
import nanofl.engine.elements.Instance;
import nanofl.engine.Library;
using htmlparser.HtmlParserTools;
using svgimport.XmlTools;

class SvgUse
{
	public var groupID : String;
	public var matrix : Matrix;
	public var styles : Map<String, String>;
	public var visible : Bool;
	public var clipPathID : String;

	public function new(node:HtmlNodeElement, baseStyles:Map<String, String>)
	{
		groupID = XmlTools.getIdFromXlink(node, "xlink:href");
		
		if (groupID != null)
		{
			matrix = Transform.load(node.getAttribute("transform"));
			
			var x = node.getFloatValue("x", 0);
			var y = node.getFloatValue("y", 0);
			if (x != 0 || y != 0) matrix.appendTransform(x, y);
			
			styles = XmlTools.getStyles(node, baseStyles);
			
			visible = node.getAttribute("display") != "none";
			
			clipPathID = XmlTools.getIdFromUrl(node, "clip-path");
		}
		else
		{
			trace("Use: 'xlink:href' attribute must be specified.");
		}
	}
}