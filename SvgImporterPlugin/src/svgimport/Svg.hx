package svgimport;

import svgimport.Segment;

class Svg extends SvgGroup
{
	private static var SIN45 : Float = 0.70710678118654752440084436210485;
	private static var TAN22 : Float = 0.4142135623730950488016887242097;
	private static var mStyleSplit = ~/;/g;
	private static var mStyleValue = ~/\s*(.*)\s*:\s*(.*)\s*/;
	private static var mTranslateMatch = ~/translate\((.*)[, ](.*)\)/;
	private static var mScaleMatch = ~/scale\((.*)\)/;
	private static var mMatrixMatch = ~/matrix\((.*)[, ](.*)[, ](.*)[, ](.*)[, ](.*)[, ](.*)\)/;
	private static var mURLMatch = ~/url\(#(.*)\)/;
	private static var defaultFill = FillType.FillSolid("#000000");
	
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
		
		width = getFloatStyle("width", svg, null, 0.0);
		height = getFloatStyle("height", svg, null, 0.0);
		
		if (width == 0 && height == 0)
			width = height = 400;
		else if (width == 0)
			width = height;
		else if (height == 0)
			height = width;
		
		loadGroup(this, svg, new Matrix(), null);
	}
	
	private function applyTransform(matrix:Matrix, trans:String) : Float
	{
		var scale = 1.0;
		
		if (mTranslateMatch.match(trans))
		{
			// TODO: Pre-translate
			
			matrix.translate(Std.parseFloat(mTranslateMatch.matched(1)), Std.parseFloat(mTranslateMatch.matched(2)));
		}
		else if (mScaleMatch.match(trans))
		{
			// TODO: Pre-scale
			var s = Std.parseFloat(mScaleMatch.matched (1));
			matrix.scale (s, s);
			scale = s;
		}
		else if (mMatrixMatch.match(trans))
		{
			
			var m = new Matrix
			(
				Std.parseFloat(mMatrixMatch.matched(1)),
				Std.parseFloat(mMatrixMatch.matched(2)),
				Std.parseFloat(mMatrixMatch.matched(3)),
				Std.parseFloat(mMatrixMatch.matched(4)),
				Std.parseFloat(mMatrixMatch.matched(5)),
				Std.parseFloat(mMatrixMatch.matched(6))
			);
			
			m.appendMatrix(matrix);
			
			matrix.a = m.a;
			matrix.b = m.b;
			matrix.c = m.c;
			matrix.d = m.d;
			matrix.tx = m.tx;
			matrix.ty = m.ty;
			
			scale = Math.sqrt(matrix.a * matrix.a + matrix.c * matrix.c);
		}
		else
		{
			trace("Warning, unknown transform:" + trans);
		}
		
		return scale;
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
	
	private function getColorStyle(key:String, node:Xml, styles:Map<String, String>, defaultValue:String) : String
	{
		var s = getStyle(key, node, styles, defaultValue);
		return s;
	}
	
	private function getFillStyle(key:String, node:Xml, styles:Map<String, String>) : FillType
	{
		var s = getStyle(key, node, styles, "");
		
		trace("getFillStyle s = " + s);
		
		if (s == "") return defaultFill;
		if (s == "none") return FillType.FillNone;
		
		if (mURLMatch.match(s))
		{
			var url = mURLMatch.matched(1);
			if (gradients.exists(url)) return FillType.FillGrad(gradients.get(url));
			throw "Unknown url:" + url;
		}
		
		return FillType.FillSolid(s);
	}
	
	private function getFloat(inXML:Xml, inName:String, inDef=0.0) : Float
	{
		return inXML.exists(inName) ? Std.parseFloat(inXML.get(inName)) : inDef;
	}
	
	
	private function getFloatStyle(key:String, node:Xml, inStyles:Map<String, String>, defaultValue:Float)
	{
		var s = getStyle(key, node, inStyles, "");
		if (s == "") return defaultValue;
		return Std.parseFloat(s);
	}
	

	private function getStrokeStyle(key:String, node:Xml, styles:Map<String, String>, defaultValue:String) : String
	{
		var s = getStyle(key, node, styles, defaultValue);
		if (s == "none") return null;
		return s;
	}
	
	
	private function getStyle(key:String, node:Xml, styles:Map<String, String>, defaultValue:String) : String
	{
		if (node != null && node.exists(key)) return node.get(key);
		if (styles != null && styles.exists(key)) return styles.get(key);
		return defaultValue;
	}
	
	
	private function getStyles(node:Xml, prevStyles:Map<String, String>) : Map<String, String>
	{
		var styles = new Map<String, String>();
		if (prevStyles != null)
		{
			for (s in prevStyles.keys())
			{
				styles.set(s, prevStyles.get(s));
			}
		}
		
		if (node.exists("style")) 
		{
			var style = node.get("style");
			var strings = mStyleSplit.split(style);
			
			for (s in strings)
			{
				if (mStyleValue.match(s))
				{
					styles.set(mStyleValue.matched(1), mStyleValue.matched(2));
				}
			}
		}
		else
		{
			for (key in SvgAttributes.presentation)
			{
				if (node.exists(key)) styles.set(key, node.get(key));
			}
		}
		
		return styles;
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
				grad.spread = base.spread;
				grad.interp = base.interp;
				grad.radius = base.radius;
			}
			else
			{
				throw "Unknown xlink : " + xlink;
			}
		}

		if (gradientNode.exists("x1"))
		{
		
			grad.x1 = getFloat(gradientNode, "x1");
			grad.y1 = getFloat(gradientNode, "y1");
			grad.x2 = getFloat(gradientNode, "x2");
			grad.y2 = getFloat(gradientNode, "y2");
		}
		else
		{
			grad.x1 = getFloat(gradientNode, "cx");
			grad.y1 = getFloat(gradientNode, "cy");
			grad.x2 = getFloat(gradientNode, "fx", grad.x1);
			grad.y2 = getFloat(gradientNode, "fy", grad.y1);
		}

		grad.radius = getFloat(gradientNode, "r");
		
		if (gradientNode.exists("gradientTransform"))
		{
			applyTransform(grad.gradMatrix, gradientNode.get("gradientTransform"));
		}
		
		// todo - grad.spread = base.spread;

		for (stop in gradientNode.elements())
		{
			var styles = getStyles(stop, null);
			
			grad.colors.push(getColorStyle("stop-color", stop, styles, "#000000"));
			grad.alphas.push(getFloatStyle("stop-opacity", stop, styles, 1.0));
			grad.ratios.push(Std.int(Std.parseFloat(stop.get("offset")) * 255.0));
		}
		
		gradients.set(name, grad);
	}
	
	
	public function loadGroup(g:SvgGroup, groupNode:Xml, matrix:Matrix, prevStyles:Map<String, String>) : SvgGroup
	{
		trace("loadGroup");
		
		if (groupNode.exists("transform"))
		{
			matrix = matrix.clone();
			applyTransform(matrix, groupNode.get("transform"));
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
		
		var styles = getStyles(groupNode, prevStyles);
		
		for (el in groupNode.elements())
		{
			var name = el.nodeName;
			
			if (name.substr(0, 4) == "svg:") name = name.substr(4);
			
			trace("\t" + name);
			
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
				g.children.push(SvgElement.DisplayText(loadText(el, matrix, styles)));
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
		trace("\t\tloadPath isRect = " + isRect + "; isEllipse = " + isEllipse+"; isCircle = " + isCircle);
		
		if (pathNode.exists("transform"))
		{
			matrix = matrix.clone();
			applyTransform(matrix, pathNode.get("transform"));
		}
		
		var styles = getStyles(pathNode, prevStyles);
		var name = pathNode.exists("id") ? pathNode.get("id") : "";
		
		var path = new SvgPath();
		
		path.alpha = getFloatStyle("opacity", pathNode, styles, 1.0);
		path.fill = getFillStyle("fill", pathNode, styles);
		path.fillAlpha = getFloatStyle("fill-opacity", pathNode, styles, 1.0);
		path.strokeAlpha = getFloatStyle("stroke-opacity", pathNode, styles, 1.0);
		path.strokeColor = getStrokeStyle("stroke", pathNode, styles, null);
		path.strokeWidth = getFloatStyle("stroke-width", pathNode, styles, 1.0);
		path.strokeCaps = "round";
		path.strokeJoints = "round";
		path.strokeMiterLimit = getFloatStyle("stroke-miterlimit", pathNode, styles, 3.0);
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
			trace("isCircle = " + isCircle);
			var x = pathNode.exists("cx") ? Std.parseFloat(pathNode.get("cx")) : 0;
			var y = pathNode.exists("cy") ? Std.parseFloat(pathNode.get("cy")) : 0;
			var r = isCircle && pathNode.exists("r") ? Std.parseFloat(pathNode.get("r")) : 0.0;
			var w = isCircle ? r : (pathNode.exists("rx") ? Std.parseFloat(pathNode.get("rx")) : 0.0);
			var w_ = w * SIN45;
			var cw_ = w * TAN22;
			var h = isCircle ? r : (pathNode.exists("ry") ? Std.parseFloat(pathNode.get("ry")) : 0.0);
			var h_ = h * SIN45;
			var ch_ = h * TAN22;
			trace("w = " + w + "; h = " + h);
			
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
	
	public function loadText(textNode:Xml, matrix:Matrix, prevStyles:Map<String, String>) : SvgText
	{
		if (textNode.exists("transform"))
		{
			matrix = matrix.clone();
			applyTransform(matrix, textNode.get("transform"));
		}
		
		var styles = getStyles(textNode, prevStyles);
		var text = new SvgText();
		
		text.matrix = matrix;
		text.name = textNode.exists("id") ? textNode.get("id") : "";
		text.x = getFloat(textNode, "x", 0.0);
		text.y = getFloat(textNode, "y", 0.0);
		text.fill = getFillStyle("fill", textNode, styles);
		text.fillAlpha = getFloatStyle("fill-opacity", textNode, styles, 1.0);
		text.strokeAlpha = getFloatStyle("stroke-opacity", textNode, styles, 1.0);
		text.strokeColor = getStrokeStyle("stroke", textNode, styles, null);
		text.strokeWidth = getFloatStyle("stroke-width", textNode, styles, 1.0);
		text.fontFamily = getStyle("font-family", textNode, styles, "");
		text.fontSize = getFloatStyle("font-size", textNode, styles, 12);
		text.letterSpacing = getFloatStyle("letter-spacing", textNode, styles, 0);
		text.kerning = getFloatStyle("kerning", textNode, styles, 0);

		text.text = "";
		for (el in textNode.elements())
		{
			text.text += el.toString();
		}
		
		return text;
	}
}