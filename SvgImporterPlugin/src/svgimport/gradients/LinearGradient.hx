package svgimport.gradients;

import nanofl.engine.geom.PointTools;
import htmlparser.HtmlNodeElement;
import nanofl.engine.geom.Bounds;
import nanofl.engine.geom.StraightLine;
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
		
		if (gradientUnits == "userSpaceOnUse")
		{
			if (x1 == null) x1 = 0;
			if (y1 == null) y1 = 0;
			if (x2 == null) x2 = svgWidth;
			if (y2 == null) y2 = 0;
		}
		else
		{
			if (x1 == null && y1 == null && x2 == null && y2 == null)
			{
				x1 = 0;
				y1 = 0;
				x2 = 1;
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
	}
	
	public function getAbsoluteParams(bounds:Bounds) : { x1:Float, y1:Float, x2:Float, y2:Float }
	{
		if (gradientUnits == "userSpaceOnUse")
		{
			/*var p1 = matrix.transformPoint(x1, y1);
			var p2 = matrix.transformPoint(x2, y2);
			
			return
			{
				x1: p1.x,
				y1: p1.y,
				x2: p2.x,
				y2: p2.y
			};*/
			
			return this;
		}
		else
		{
			var w = bounds.maxX - bounds.minX;
			var h = bounds.maxY - bounds.minY;
			
			//var p1 = matrix.transformPoint(x1 * w, y1 * w);
			//var p2 = matrix.transformPoint(x2 * w, y2 * w);
			
			var p1 = { x:x1 * w, y:y1 * w };
			var p2 = { x:x2 * w, y:y2 * w };
			
			if (w > 0)
			{
				var k = h/w;
				
				var line = new StraightLine(p1.x, p1.y, p2.x, p2.y);
				var v = line.getOrthogonalVector();
				var ortho = new StraightLine(p2.x, p2.y, p2.x + v.x, p2.y + v.y);
				ortho.y1 *= k;
				ortho.y2 *= k;
				p2 = ortho.getOrthogonalRayIntersection(p1.x, p1.y).point;
				
				var ortho = new StraightLine(p1.x, p1.y, p1.x + v.x, p1.y + v.y);
				ortho.y1 *= k;
				ortho.y2 *= k;
				p1 = ortho.getOrthogonalRayIntersection(p2.x, p2.y).point;
			}
			
			return
			{
				x1: p1.x + bounds.minX,
				y1: p1.y + bounds.minY,
				x2: p2.x + bounds.minX,
				y2: p2.y + bounds.minY
			};
		}
	}
}