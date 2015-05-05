package svgimport;

import htmlparser.HtmlNodeElement;
import svgimport.gradients.Gradient;
import svgimport.gradients.GradientType;
using htmlparser.HtmlParserTools;
using StringTools;
using svgimport.XmlTools;

class SvgGroup
{
	var svg : Svg;
	
	public var node : HtmlNodeElement;
	
	public var id : String;
	public var name : String;
	public var children = new Array<SvgElement>();
	public var matrix : Matrix;
	public var visible : Bool;
	public var clipPathID : String;
	
	public function new(svg:Svg, node:HtmlNodeElement, styles:Map<String, String>, ?id:String) : Void
	{
		this.svg = svg;
		
		this.node = node;
		
		this.id = id != null ? id : node.getAttr("id", "");
		if (this.id != "") svg.elements.set(this.id, SvgElement.DisplayGroup(this));
		
		name = node.getAttr("inkscape:label", this.id);
		matrix = Transform.load(node.getAttribute("transform"));
		visible = node.getAttribute("display") != "none";
		clipPathID = XmlTools.getIdFromUrl(node, "clip-path");
		
		loadChildren(node, XmlTools.getStyles(node, styles));
	}
	
	function loadChildren(xml:HtmlNodeElement, styles:Map<String, String>)
	{
		for (child in xml.children)
		{
			switch (XmlTools.normalizeTag(child.name))
			{
				case "defs":
					loadDefs(child);
					
				case "g":
					children.push(SvgElement.DisplayGroup(new SvgGroup(svg, child, styles)));
					
				case"use":
					var use = new SvgUse(child, styles);
					if (use.groupID != null) children.push(SvgElement.DisplayUse(use));
					
				case "path", "line", "polyline", "rect", "polygon", "ellipse", "circle":
					children.push(SvgElement.DisplayPath(new SvgPath(svg, child, styles)));
					
				case "text":
					children.push(SvgElement.DisplayText(new SvgText(child, styles, svg.gradients)));
					
				case "linearGradient":
					loadGradient(child);
					
				case "radialGradient":
					loadGradient(child);
					
				case "a":
					loadChildren(child, styles);
					
				case _:
					trace("Unknown tag '" + child.name + "'.");
			}
		}
	}
	
	function loadDefs(defsNode:HtmlNodeElement)
	{
		for (child in defsNode.children)
		{
			switch (XmlTools.normalizeTag(child.name))
			{
				case "linearGradient":	loadGradient(child);
				case "radialGradient":	loadGradient(child);
				case "g":				new SvgGroup(svg, child, null);
				case "path", "line", "polyline", "rect", "polygon", "ellipse", "circle": new SvgPath(svg, child, null);
				case "clipPath":		new SvgGroup(svg, child, [ "stroke"=>"none", "fill"=>"red" ]);
				case _:					trace("Unknown tag '" + child.name + "'.");
			}
		}
		
		for (child in defsNode.children)
		{
			switch (XmlTools.normalizeTag(child.name))
			{
				case "linearGradient":	loadGradient(child);
				case "radialGradient":	loadGradient(child);
				case _:
			}
		}
	}
	
	function loadGradient(node:HtmlNodeElement) : Void
	{
		var baseGradID = XmlTools.getIdFromXlink(node, "xlink:href");
		if (baseGradID == null || svg.gradients.exists(baseGradID))
		{
			var gradID = node.getAttribute("id");
			if (!svg.gradients.exists(gradID))
			{
				svg.gradients.set(gradID, Gradient.load(svg, node, baseGradID != null ? svg.gradients.get(baseGradID) : null));
			}
		}
	}
}
