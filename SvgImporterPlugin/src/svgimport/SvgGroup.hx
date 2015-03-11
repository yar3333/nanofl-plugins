package svgimport;

import htmlparser.HtmlNodeElement;
using htmlparser.HtmlParserTools;

class SvgGroup
{
	public var name = "";
	public var children = new Array<SvgElement>();
	public var matrix : Matrix;
	public var visible : Bool;
	
	public function new(groupNode:HtmlNodeElement, baseStyles:Map<String, String>, gradients:Map<String, Grad>) : Void
	{
		name = groupNode.getAttr("inkscape:label", groupNode.getAttr("id", ""));
		loadChildren(groupNode, XmlTools.getStyles(groupNode, baseStyles, gradients), gradients);
		matrix = Transform.load(groupNode.getAttribute("transform"));
		visible = groupNode.getAttribute("display") != "none";
	}

	public function hasGroup(inName:String) { return findGroup(inName) != null; }
	
	public function findGroup(inName:String) : SvgGroup
	{
		for (child in children)
		{
			switch (child)
			{
				case DisplayGroup(group): if (group.name == inName) return group;
				case _:
			}
		}
		return null;
	}
	
	function loadChildren(xml:HtmlNodeElement, styles:Map<String, String>, gradients:Map<String, Grad>)
	{
		for (el in xml.children)
		{
			var name = el.name;
			
			if (name.substr(0, 4) == "svg:") name = name.substr(4);
			
			if (name == "defs")
			{
				loadDefs(el, gradients);
			}
			else if (name == "g")
			{
				children.push(SvgElement.DisplayGroup(new SvgGroup(el, styles, gradients)));
			}
			else if (name == "path" || name == "line" || name == "polyline")
			{
				children.push(SvgElement.DisplayPath(new SvgPath(el, styles, gradients, false, false)));
			}
			else if (name == "rect")
			{
				children.push(SvgElement.DisplayPath(new SvgPath(el, styles, gradients, true, false)));
			}
			else if (name == "polygon")
			{
				children.push(SvgElement.DisplayPath(new SvgPath(el, styles, gradients, false, false)));
			}
			else if (name == "ellipse")
			{
				children.push(SvgElement.DisplayPath(new SvgPath(el, styles, gradients, false, true)));
			}
			else if (name == "circle")
			{
				children.push(SvgElement.DisplayPath(new SvgPath(el, styles, gradients, false, true, true)));
			}
			else if (name == "text")
			{
				children.push(SvgElement.DisplayText(new SvgText(el, styles, gradients)));
			}
			else if (name == "linearGradient")
			{
				loadGradient(el, GradientType.LINEAR, true, gradients);
			}
			else if (name == "radialGradient")
			{
				loadGradient(el, GradientType.RADIAL, true, gradients);
			}
			else if (name == "a")
			{
				loadChildren(el, styles, gradients);
			}
			else
			{
				trace("Unknown tag '" + name+"'.");
			}
		}
	}
	
	function loadDefs(xml:HtmlNodeElement, gradients:Map<String, Grad>)
	{
		// Two passes - to allow forward xlinks
		
		for (pass in 0...2)
		{
			for (def in xml.children)
			{
				var name = def.name;
				
				if (name.substr (0, 4) == "svg:")
				{
					name = name.substr(4);
				}
				
				if (name == "linearGradient")
				{
					loadGradient(def, GradientType.LINEAR, pass == 1, gradients);
				}
				else if (name == "radialGradient")
				{
					loadGradient(def, GradientType.RADIAL, pass == 1, gradients);
				}
			}
		}
	}
	
	function loadGradient(gradientNode:HtmlNodeElement, type:GradientType, crossLink:Bool, gradients:Map<String, Grad>)
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
