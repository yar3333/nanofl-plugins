package svgimport;

import svgimport.Segment;

class Svg extends SvgGroup
{
	private static var SIN45 : Float = 0.70710678118654752440084436210485;
	private static var TAN22 : Float = 0.4142135623730950488016887242097;
	
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
				g.children.push(SvgElement.DisplayPath(loadPath(el, matrix, styles, false, false)));
			}
			else if (name == "rect")
			{
				g.children.push(SvgElement.DisplayPath(loadPath(el, matrix, styles, true, false)));
			}
			else if (name == "polygon")
			{
				g.children.push(SvgElement.DisplayPath(loadPath(el, matrix, styles, false, false)));
			}
			else if (name == "ellipse")
			{
				g.children.push(SvgElement.DisplayPath(loadPath(el, matrix, styles, false, true)));
			}
			else if (name == "circle")
			{
				g.children.push(SvgElement.DisplayPath(loadPath(el, matrix, styles, false, true, true)));
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
	
	
	public function loadPath(pathNode:Xml, matrix:Matrix, prevStyles:Map<String, String>, isRect:Bool, isEllipse:Bool, isCircle=false) : SvgPath
	{
		//trace("\t\tloadPath isRect = " + isRect + "; isEllipse = " + isEllipse+"; isCircle = " + isCircle);
		
		if (pathNode.exists("transform"))
		{
			matrix = matrix.clone();
			Transform.apply(matrix, pathNode.get("transform"));
		}
		
		var styles = XmlTools.getStyles(pathNode, prevStyles, gradients);
		var name = pathNode.exists("id") ? pathNode.get("id") : "";
		
		var path = new SvgPath();
		
		path.alpha = XmlTools.getFloatStyle(pathNode, "opacity", styles, 1.0);
		path.fill = XmlTools.getFillStyle(pathNode, "fill", styles,gradients);
		path.fillAlpha = XmlTools.getFloatStyle(pathNode, "fill-opacity", styles, 1.0);
		path.strokeAlpha = XmlTools.getFloatStyle(pathNode, "stroke-opacity", styles, 1.0);
		path.strokeColor = XmlTools.getStrokeStyle(pathNode, "stroke", styles, null);
		path.strokeWidth = XmlTools.getFloatStyle(pathNode, "stroke-width", styles, 1.0);
		path.strokeCaps = "round";
		path.strokeJoints = "round";
		path.strokeMiterLimit = XmlTools.getFloatStyle(pathNode, "stroke-miterlimit", styles, 3.0);
		path.segments = [];
		path.matrix = matrix;
		path.name = name;

		if (isRect)
		{
			var x = pathNode.exists("x") ? Std.parseFloat(pathNode.get("x")) : 0;
			var y = pathNode.exists("y") ? Std.parseFloat(pathNode.get("y")) : 0;
			var w = Std.parseFloat(pathNode.get("width"));
			var h = Std.parseFloat(pathNode.get("height"));
			var rx = pathNode.exists("rx") ? Std.parseFloat(pathNode.get("rx")) : 0.0;
			var ry = pathNode.exists("ry") ? Std.parseFloat(pathNode.get("ry")) : 0.0;
			
			if (rx == 0 || ry == 0)
			{
				path.segments.push(new MoveSegment(x, y));
				path.segments.push(new DrawSegment(x + w, y));
				path.segments.push(new DrawSegment(x + w, y + h));
				path.segments.push(new DrawSegment(x, y + h));
				path.segments.push(new DrawSegment(x, y));
			}
			else
			{
				path.segments.push(new MoveSegment(x, y + ry));
				
				// top-left
				path.segments.push(new QuadraticSegment(x, y, x + rx, y));
				path.segments.push(new DrawSegment(x + w - rx, y));
				
				// top-right
				path.segments.push(new QuadraticSegment(x + w, y, x + w, y + rx));
				path.segments.push(new DrawSegment(x + w, y + h - ry));
				
				// bottom-right
				path.segments.push(new QuadraticSegment(x + w, y + h, x + w - rx, y + h));
				path.segments.push(new DrawSegment(x + rx, y + h));
				
				// bottom-left
				path.segments.push(new QuadraticSegment(x, y + h, x, y + h - ry));
				path.segments.push(new DrawSegment(x, y + ry));
			}
		}
		else if (isEllipse)
		{
			var x = pathNode.exists("cx") ? Std.parseFloat(pathNode.get("cx")) : 0;
			var y = pathNode.exists("cy") ? Std.parseFloat(pathNode.get("cy")) : 0;
			var r = isCircle && pathNode.exists("r") ? Std.parseFloat(pathNode.get("r")) : 0.0;
			var w = isCircle ? r : (pathNode.exists("rx") ? Std.parseFloat(pathNode.get("rx")) : 0.0);
			var w_ = w * SIN45;
			var cw_ = w * TAN22;
			var h = isCircle ? r : (pathNode.exists("ry") ? Std.parseFloat(pathNode.get("ry")) : 0.0);
			var h_ = h * SIN45;
			var ch_ = h * TAN22;
			
			path.segments.push(new MoveSegment(x + w, y));
			path.segments.push(new QuadraticSegment(x + w, y + ch_, x + w_, y + h_));
			path.segments.push(new QuadraticSegment(x + cw_, y + h, x, y + h));
			path.segments.push(new QuadraticSegment(x - cw_, y + h, x - w_, y + h_));
			path.segments.push(new QuadraticSegment(x - w, y + ch_, x - w, y));
			path.segments.push(new QuadraticSegment(x - w, y - ch_, x - w_, y - h_));
			path.segments.push(new QuadraticSegment(x - cw_, y - h, x, y - h));
			path.segments.push(new QuadraticSegment(x + cw_, y - h, x + w_, y - h_));
			path.segments.push(new QuadraticSegment(x + w, y - ch_, x + w, y));
		}
		else
		{
			var d = pathNode.exists("points") ? ("M" + pathNode.get("points") + "z") :
					pathNode.exists("x1") ? ("M" + pathNode.get("x1") + "," + pathNode.get("y1") + " " + pathNode.get("x2") + "," + pathNode.get("y2") + "z") :
					pathNode.get("d");
			
			for (segment in pathParser.parse(d))
			{
				path.segments.push(segment);
			}
		}
		
		return path;
	}
}