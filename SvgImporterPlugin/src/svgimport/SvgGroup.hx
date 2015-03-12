package svgimport;

import htmlparser.HtmlNodeElement;
using htmlparser.HtmlParserTools;
using StringTools;

class SvgGroup
{
	public var groups : Map<String, SvgGroup>;
	private var gradients : Map<String, Grad>;
	
	public var id : String;
	public var name : String;
	public var children = new Array<SvgElement>();
	public var matrix : Matrix;
	public var visible : Bool;
	
	public function new(groupNode:HtmlNodeElement, baseStyles:Map<String, String>, groups:Map<String, SvgGroup>, gradients:Map<String, Grad>) : Void
	{
		this.groups = groups;
		this.gradients = gradients;
		
		id = groupNode.getAttr("id", "");
		if (id != "") groups.set(id, this);
		
		name = groupNode.getAttr("inkscape:label", id);
		loadChildren(groupNode, XmlTools.getStyles(groupNode, baseStyles, gradients));
		matrix = Transform.load(groupNode.getAttribute("transform"));
		visible = groupNode.getAttribute("display") != "none";
	}
	
	function loadChildren(xml:HtmlNodeElement, styles:Map<String, String>)
	{
		for (el in xml.children)
		{
			switch (XmlTools.normalizeTag(el.name))
			{
				case "defs":
					loadDefs(el);
					
				case "g":
					children.push(SvgElement.DisplayGroup(new SvgGroup(el, styles, groups, gradients)));
					
				case"use":
					var e = loadUse(el); if (e != null) children.push(e);
					
				case "path", "line", "polyline":
					children.push(SvgElement.DisplayPath(new SvgPath(el, styles, gradients, false, false)));
					
				case "rect":
					children.push(SvgElement.DisplayPath(new SvgPath(el, styles, gradients, true, false)));
					
				case "polygon":
					children.push(SvgElement.DisplayPath(new SvgPath(el, styles, gradients, false, false)));
					
				case "ellipse":
					children.push(SvgElement.DisplayPath(new SvgPath(el, styles, gradients, false, true)));
					
				case "circle":
					children.push(SvgElement.DisplayPath(new SvgPath(el, styles, gradients, false, true, true)));
					
				case "text":
					children.push(SvgElement.DisplayText(new SvgText(el, styles, gradients)));
					
				case "linearGradient":
					loadGradient(el, GradientType.LINEAR, true);
					
				case "radialGradient":
					loadGradient(el, GradientType.RADIAL, true);
					
				case "a":
					loadChildren(el, styles);
					
				case _:
					trace("Unknown tag '" + el.name + "'.");
			}
		}
	}
	
	function loadDefs(defsNode:HtmlNodeElement)
	{
		for (pass in 0...2)
		{
			for (child in defsNode.children)
			{
				switch (XmlTools.normalizeTag(child.name))
				{
					case "linearGradient": loadGradient(child, GradientType.LINEAR, pass == 1);
					case "radialGradient": loadGradient(child, GradientType.RADIAL, pass == 1);
					case "g": if (pass == 0) new SvgGroup(child, null, groups, gradients);
					case _: trace("Unknown tag '" + child.name + "'.");
				}
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
	
	function loadGradient(gradientNode:HtmlNodeElement, type:GradientType, crossLink:Bool)
	{
		var name = gradientNode.getAttribute("id");
		var grad = new Grad(type);
		
		if (crossLink && gradientNode.hasAttribute("xlink:href"))
		{
			var xlink = gradientNode.getAttribute("xlink:href");
			
			if (xlink.charAt(0) != "#") throw "xlink - unkown syntax : " + xlink;
			
			var base = gradients.get(xlink.substr(1));
			
			if (base != null)
			{
				grad.colors = base.colors;
				grad.alphas = base.alphas;
				grad.ratios = base.ratios;
				grad.gradMatrix = base.gradMatrix.clone();
				grad.radius = base.radius;
			}
			else
			{
				throw "Unknown xlink : " + xlink;
			}
		}

		if (gradientNode.hasAttribute("x1"))
		{
		
			grad.x1 = gradientNode.getAttrFloat("x1");
			grad.y1 = gradientNode.getAttrFloat("y1");
			grad.x2 = gradientNode.getAttrFloat("x2");
			grad.y2 = gradientNode.getAttrFloat("y2");
		}
		else
		{
			grad.x1 = gradientNode.getAttrFloat("cx");
			grad.y1 = gradientNode.getAttrFloat("cy");
			grad.x2 = gradientNode.getAttrFloat("fx", grad.x1);
			grad.y2 = gradientNode.getAttrFloat("fy", grad.y1);
		}

		grad.radius = gradientNode.getAttrFloat("r");
		
		grad.gradMatrix.appendMatrix(Transform.load(gradientNode.getAttribute("gradientTransform")));
		
		// todo - grad.spread = base.spread;

		for (stop in gradientNode.children)
		{
			var styles = XmlTools.getStyles(stop, null, gradients);
			
			grad.colors.push(XmlTools.getColorStyle(stop, "stop-color", styles, "#000000"));
			grad.alphas.push(XmlTools.getFloatStyle(stop, "stop-opacity", styles, 1.0));
			grad.ratios.push(Std.int(Std.parseFloat(stop.getAttribute("offset")) * 255.0));
		}
		
		gradients.set(name, grad);
	}
}
