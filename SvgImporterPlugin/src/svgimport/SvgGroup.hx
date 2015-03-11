package svgimport;

class SvgGroup
{
	public var name = "";
	public var children = new Array<SvgElement>();
	public var matrix : Matrix;
	public var visible : Bool;
	
	public function new(groupNode:Xml, baseStyles:Map<String, String>, gradients:Map<String, Grad>) : Void
	{
		matrix = Transform.load(groupNode.get("transform"));
		
		if (groupNode.exists("inkscape:label"))
		{
			name = groupNode.get("inkscape:label");
		}
		else if (groupNode.exists("id"))
		{
			name = groupNode.get("id");
		}
		
		loadChildren(groupNode, XmlTools.getStyles(groupNode, baseStyles, gradients), gradients);
		
		visible = !(groupNode.exists("display") && groupNode.get("display") == "none");
	}

	public function hasGroup(inName:String) { return findGroup(inName) != null; }
	
	public function findGroup(inName:String) : SvgGroup
	{
		for (child in children)
			switch (child)
			{
				case DisplayGroup(group):
					if (group.name == inName)
						return group;
				default:
			}
		return null;
	}
	
	function loadChildren(xml:Xml, styles:Map<String, String>, gradients:Map<String, Grad>)
	{
		for (el in xml.elements())
		{
			var name = el.nodeName;
			
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
	
	function loadDefs(xml:Xml, gradients:Map<String, Grad>)
	{
		// Two passes - to allow forward xlinks
		
		for (pass in 0...2)
		{
			for (def in xml.elements())
			{
				var name = def.nodeName;
				
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
	
	function loadGradient(gradientNode:Xml, type:GradientType, crossLink:Bool, gradients:Map<String, Grad>)
	{
		var name = gradientNode.get("id");
		var grad = new Grad(type);
		
		if (crossLink && gradientNode.exists("xlink:href"))
		{
			var xlink = gradientNode.get("xlink:href");
			
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

		if (gradientNode.exists("x1"))
		{
		
			grad.x1 = XmlTools.getFloat(gradientNode, "x1");
			grad.y1 = XmlTools.getFloat(gradientNode, "y1");
			grad.x2 = XmlTools.getFloat(gradientNode, "x2");
			grad.y2 = XmlTools.getFloat(gradientNode, "y2");
		}
		else
		{
			grad.x1 = XmlTools.getFloat(gradientNode, "cx");
			grad.y1 = XmlTools.getFloat(gradientNode, "cy");
			grad.x2 = XmlTools.getFloat(gradientNode, "fx", grad.x1);
			grad.y2 = XmlTools.getFloat(gradientNode, "fy", grad.y1);
		}

		grad.radius = XmlTools.getFloat(gradientNode, "r");
		
		grad.gradMatrix.appendMatrix(Transform.load(gradientNode.get("gradientTransform")));
		
		// todo - grad.spread = base.spread;

		for (stop in gradientNode.elements())
		{
			var styles = XmlTools.getStyles(stop, null, gradients);
			
			grad.colors.push(XmlTools.getColorStyle(stop, "stop-color", styles, "#000000"));
			grad.alphas.push(XmlTools.getFloatStyle(stop, "stop-opacity", styles, 1.0));
			grad.ratios.push(Std.int(Std.parseFloat(stop.get("offset")) * 255.0));
		}
		
		gradients.set(name, grad);
	}
}
