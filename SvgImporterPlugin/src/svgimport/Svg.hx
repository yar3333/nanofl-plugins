package svgimport;

class Svg extends SvgGroup
{
	public var height(default, null) : Float;
	public var width(default, null) : Float;
	
	private var gradients : Map<String, Grad>;
	private var pathParser : SvgPathParser;
	
	public function new(xml:Xml)
	{
		super();
		
		var svg = xml.firstElement();
		
		if (svg == null || (svg.nodeName != "svg" && svg.nodeName != "svg:svg"))
		{
			throw "Not an SVG file (" + (svg == null ? "null" : svg.nodeName) + ")";
		}
		
		gradients = new Map<String, Grad>();
		pathParser = new SvgPathParser();
		
		width = XmlTools.getFloatStyle(svg, "width", null, 0.0);
		height = XmlTools.getFloatStyle(svg, "height", null, 0.0);
		
		if (width == 0 && height == 0)
		{
			width = height = 400;
			
			if (svg.exists("viewBox"))
			{
				var viewBoxValues = ~/\s+/g.split(svg.get("viewBox"));
				if (viewBoxValues.length == 4)
				{
					width = Std.parseFloat(viewBoxValues[2]);
					height = Std.parseFloat(viewBoxValues[3]);
				}
			}
		}
		else if (width  == 0) width = height;
		else if (height == 0) height = width;
		
		loadGroup(this, svg, new Matrix(), null);
	}
	
	
	private function dumpGroup(g:SvgGroup, indent:String)
	{
		trace(indent + "Group:" + g.name);
		indent += "  ";
		
		for (e in g.children) {
			
			switch (e)
			{
				case SvgElement.DisplayPath(path) : trace (indent + "Path" + "  " + path.matrix);
				case SvgElement.DisplayGroup(group) : dumpGroup (group, indent+"   ");
				case SvgElement.DisplayText(text) : trace (indent + "Text " + text.text);
			}
		}
	}
	
	private function loadDefs(inXML:Xml)
	{
		// Two passes - to allow forward xlinks
		
		for (pass in 0...2)
		{
			for (def in inXML.elements())
			{
				var name = def.nodeName;
				
				if (name.substr (0, 4) == "svg:")
				{
					name = name.substr (4);
				}
				
				if (name == "linearGradient")
				{
					loadGradient(def, GradientType.LINEAR, pass == 1);
				}
				else if (name == "radialGradient")
				{
					loadGradient(def, GradientType.RADIAL, pass == 1);
				}
			}
		}
	}
	
	
	private function loadGradient(gradientNode:Xml, type:GradientType, crossLink:Bool)
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
		
		if (gradientNode.exists("gradientTransform"))
		{
			Transform.apply(grad.gradMatrix, gradientNode.get("gradientTransform"));
		}
		
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
	
	
	public function loadGroup(g:SvgGroup, groupNode:Xml, matrix:Matrix, prevStyles:Map<String, String>) : SvgGroup
	{
		if (groupNode.exists("transform"))
		{
			matrix = matrix.clone();
			Transform.apply(matrix, groupNode.get("transform"));
		}
		
		if (g.name == null || g.name == "")
		{
			if (groupNode.exists("inkscape:label"))
			{
				g.name = groupNode.get("inkscape:label");
			}
			else if (groupNode.exists("id"))
			{
				g.name = groupNode.get("id");
			}
		}
		
		var styles = XmlTools.getStyles(groupNode, prevStyles, gradients);
		
		for (el in groupNode.elements())
		{
			var name = el.nodeName;
			
			if (name.substr(0, 4) == "svg:") name = name.substr(4);
			
			if (name == "defs")
			{
				loadDefs(el);
			}
			else if (name == "g")
			{
				if (!(el.exists("display") && el.get("display") == "none"))
				{
					g.children.push(SvgElement.DisplayGroup(loadGroup(new SvgGroup(), el, matrix, styles)));
				}
			}
			else if (name == "path" || name == "line" || name == "polyline")
			{
				g.children.push(SvgElement.DisplayPath(new SvgPath(el, matrix, styles, gradients, pathParser, false, false)));
			}
			else if (name == "rect")
			{
				g.children.push(SvgElement.DisplayPath(new SvgPath(el, matrix, styles, gradients, pathParser, true, false)));
			}
			else if (name == "polygon")
			{
				g.children.push(SvgElement.DisplayPath(new SvgPath(el, matrix, styles, gradients, pathParser, false, false)));
			}
			else if (name == "ellipse")
			{
				g.children.push(SvgElement.DisplayPath(new SvgPath(el, matrix, styles, gradients, pathParser, false, true)));
			}
			else if (name == "circle")
			{
				g.children.push(SvgElement.DisplayPath(new SvgPath(el, matrix, styles, gradients, pathParser, false, true, true)));
			}
			else if (name == "text")
			{
				g.children.push(SvgElement.DisplayText(new SvgText(el, matrix, styles, gradients)));
			}
			else if (name == "linearGradient")
			{
				loadGradient(el, GradientType.LINEAR, true);
			}
			else if (name == "radialGradient")
			{
				loadGradient(el, GradientType.RADIAL, true);
			}
			else if (name == "a")
			{
				loadGroup(this, el, matrix, styles);
			}
			else
			{
				trace("Unknown tag '" + name+"'.");
			}
		}
		
		return g;
	}
	
	
}