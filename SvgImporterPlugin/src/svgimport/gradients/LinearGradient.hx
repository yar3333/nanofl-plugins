package svgimport.gradients;

import nanofl.engine.geom.PointTools;
import htmlparser.HtmlNodeElement;
import nanofl.engine.geom.Bounds;
using htmlparser.HtmlParserTools;
using svgimport.XmlTools;

class LinearGradient extends Gradient
{
	public var x1 : Float;
	public var y1 : Float;
	public var x2 : Float;
	public var y2 : Float;
	
	function new(node:HtmlNodeElement, baseType:GradientType, svgWidth:Float) 
	{
		super(node, baseType);
		
		var base : LinearGradient = null;
		if (baseType != null)
		{
			switch (baseType)
			{
				case GradientType.LINEAR(grad): base = grad;
				case _:
			};
		}
		
		x1 = node.getFloatValue("x1", base != null ? base.x1 : null);
		y1 = node.getFloatValue("y1", base != null ? base.y1 : null);
		x2 = node.getFloatValue("x2", base != null ? base.x2 : null);
		y2 = node.getFloatValue("y2", base != null ? base.y2 : null);
		
		if (gradientUnits != "userSpaceOnUse")
		{
			if (x1 == null && y1 == null && x2 == null && y2 == null)
			{
				x1 = 0;
				y1 = 0;
				x2 = 0.5;
				y2 = 0;
			}
			else
			{
				if (x1 == null) x1 = 0;
				if (y1 == null) y1 = 0;
				if (x2 == null) x2 = 0;
				if (y2 == null) y2 = 0;
			}
		}
		else
		{
			if (x1 == null) x1 = 0;
			if (y1 == null) y1 = 0;
			if (x2 == null) x2 = svgWidth;
			if (y2 == null) y2 = 0;
		}
	}
	
	public function getFullMatrix(bounds:Bounds) : Matrix
	{
		var m = new Matrix();
		
		if (gradientUnits == "userSpaceOnUse")
		{
			var w = Math.abs(x2 - x1);
			var h = Math.abs(y2 - y1);
			
			m.scale(Math.sqrt(w*w + h*h) / 2, 1);
			
			m.rotate(Math.atan2(y2 - y1, x2 - x1));
			
			m.appendMatrix(matrix);
			
			m.translate((x1 + x2) / 2, (y1 + y2) / 2);
		}
		else
		{
			m.scale(0.5, 0.5);
			m.translate(0.5, 0.5);
			
			var dx = x2 - x1;
			var dy = y2 - y1;
			m.scale(Math.sqrt(dx * dx + dy * dy), 1);
			
			m.rotate(Math.atan2(dy, dx));
			
			var w = bounds.maxX - bounds.minX;
			var h = bounds.maxY - bounds.minY;
			m.scale(w, h);
			
			m.translate(x1*w, y1*h);
			
			m.appendMatrix(matrix);
			
			m.translate(bounds.minX, bounds.minY);
		}
		
		return m;
	}
}