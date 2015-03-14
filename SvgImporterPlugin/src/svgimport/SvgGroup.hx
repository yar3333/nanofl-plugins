package svgimport;

import htmlparser.HtmlNodeElement;
import svgimport.gradients.Gradient;
import svgimport.gradients.GradientType;
using htmlparser.HtmlParserTools;
using StringTools;
using svgimport.XmlTools;

class SvgGroup
{
	public var node : HtmlNodeElement;
	var styles : Map<String, String>;
	
	public var elements : Map<String, SvgElement>;
	public var gradients : Map<String, GradientType>;
	
	public var id : String;
	public var name : String;
	public var children = new Array<SvgElement>();
	public var matrix : Matrix;
	public var visible : Bool;
	
	public function new(node:HtmlNodeElement, styles:Map<String, String>, elements:Map<String, SvgElement>, gradients:Map<String, GradientType>, ?id:String) : Void
	{
		this.node = node;
		this.styles = XmlTools.getStyles(node, styles);
		
		this.elements = elements;
		this.gradients = gradients;
		
		this.id = id != null ? id : node.getAttr("id", ""); if (this.id != "") elements.set(this.id, SvgElement.DisplayGroup(this));
		trace(this.id + " => " + this.styles);
		name = node.getAttr("inkscape:label", this.id);
		matrix = Transform.load(node.getAttribute("transform"));
		visible = node.getAttribute("display") != "none";
		
		loadChildren(node);
	}
	
	function loadChildren(xml:HtmlNodeElement)
	{
		for (child in xml.children)
		{
			switch (XmlTools.normalizeTag(child.name))
			{
				case "defs":
					loadDefs(child);
					
				case "g":
					children.push(SvgElement.DisplayGroup(new SvgGroup(child, styles, elements, gradients)));
					
				case"use":
					var e = loadUse(child); if (e != null) children.push(e);
					
				case "path", "line", "polyline", "rect", "polygon", "ellipse", "circle":
					children.push(SvgElement.DisplayPath(new SvgPath(child, styles, elements, gradients)));
					
				case "text":
					children.push(SvgElement.DisplayText(new SvgText(child, styles, gradients)));
					
				case "linearGradient":
					loadGradient(child);
					
				case "radialGradient":
					loadGradient(child);
					
				case "a":
					loadChildren(child);
					
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
				case "g":				new SvgGroup(child, null, elements, gradients);
				case "path", "line", "polyline", "rect", "polygon", "ellipse", "circle": new SvgPath(child, null, elements, gradients);
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
	
	function loadUse(node:HtmlNodeElement) : SvgElement
	{
		var groupID = XmlTools.getXlink(node);
		if (groupID != null)
		{
			var matrix = Transform.load(node.getAttribute("transform"));
			
			var x = node.getFloatValue("x", 0);
			var y = node.getFloatValue("y", 0);
			if (x != 0 || y != 0) matrix.prependTransform(x, y);
			
			return SvgElement.DisplayUse
			(
				groupID,
				matrix,
				XmlTools.getStyles(node, styles),
				node.getAttribute("display") != "none"
			);
		}
		trace("Use: 'xlink:href' attribute must be specified.");
		return null;
	}
	
	function loadGradient(node:HtmlNodeElement) : Void
	{
		var baseGradID = XmlTools.getXlink(node);
		if (baseGradID == null || gradients.exists(baseGradID))
		{
			var gradID = node.getAttribute("id");
			if (!gradients.exists(gradID))
			{
				gradients.set(gradID, Gradient.load(node, baseGradID != null ? gradients.get(baseGradID) : null));
			}
		}
	}
}
