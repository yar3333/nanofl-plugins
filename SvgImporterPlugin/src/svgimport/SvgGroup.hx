package svgimport;

import htmlparser.HtmlNodeElement;
import svgimport.gradients.Gradient;
import svgimport.gradients.GradientType;
using htmlparser.HtmlParserTools;
using StringTools;

class SvgGroup
{
	public var groups : Map<String, SvgGroup>;
	private var gradients : Map<String, GradientType>;
	
	public var id : String;
	public var name : String;
	public var children = new Array<SvgElement>();
	public var matrix : Matrix;
	public var visible : Bool;
	
	public function new(groupNode:HtmlNodeElement, baseStyles:Map<String, String>, groups:Map<String, SvgGroup>, gradients:Map<String, GradientType>) : Void
	{
		this.groups = groups;
		this.gradients = gradients;
		
		id = groupNode.getAttr("id", "");
		if (id != "") groups.set(id, this);
		
		trace("new SvgGroup(" + id + ")");
		
		name = groupNode.getAttr("inkscape:label", id);
		loadChildren(groupNode, XmlTools.getStyles(groupNode, baseStyles));
		matrix = Transform.load(groupNode.getAttribute("transform"));
		visible = groupNode.getAttribute("display") != "none";
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
					children.push(SvgElement.DisplayGroup(new SvgGroup(child, styles, groups, gradients)));
					
				case"use":
					var e = loadUse(child); if (e != null) children.push(e);
					
				case "path", "line", "polyline":
					children.push(SvgElement.DisplayPath(new SvgPath(child, styles, gradients, false, false)));
					
				case "rect":
					children.push(SvgElement.DisplayPath(new SvgPath(child, styles, gradients, true, false)));
					
				case "polygon":
					children.push(SvgElement.DisplayPath(new SvgPath(child, styles, gradients, false, false)));
					
				case "ellipse":
					children.push(SvgElement.DisplayPath(new SvgPath(child, styles, gradients, false, true)));
					
				case "circle":
					children.push(SvgElement.DisplayPath(new SvgPath(child, styles, gradients, false, true, true)));
					
				case "text":
					children.push(SvgElement.DisplayText(new SvgText(child, styles, gradients)));
					
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
				case "g":				new SvgGroup(child, null, groups, gradients);
				case _:					trace("Unknown tag '" + child.name + "'.");
			}
		}
	}
	
	function loadUse(node:HtmlNodeElement) : SvgElement
	{
		var groupID = XmlTools.getXlink(node);
		if (groupID != null)
		{
			var matrix = Transform.load(node.getAttribute("transform"));
			
			var x = node.getAttrFloat("x", 0);
			var y = node.getAttrFloat("y", 0);
			if (x != 0 || y != 0) matrix.prependTransform(x, y);
			
			var visible = node.getAttribute("display") != "none";

			return SvgElement.DisplayUse(groupID, matrix, visible);
		}
		trace("Use: groupID not found.");
		return null;
	}
	
	function loadGradient(node:HtmlNodeElement) : Void
	{
		gradients.set(node.getAttribute("id"), Gradient.load(node));
	}
}
