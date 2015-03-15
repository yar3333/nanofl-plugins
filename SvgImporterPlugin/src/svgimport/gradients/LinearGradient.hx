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
	
	function new(node:HtmlNodeElement, baseType:GradientType) 
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
		
		x1 = node.getFloatValue("x1", base != null ? base.x1 : 0);
		y1 = node.getFloatValue("y1", base != null ? base.y1 : 0);
		x2 = node.getFloatValue("x2", base != null ? base.x2 : 0);
		y2 = node.getFloatValue("y2", base != null ? base.y2 : 0);
		
	}
	
	public function getFullMatrix(bounds:Bounds) : Matrix
	{
		var matrix = new Matrix();
		
		if (gradientUnits == "userSpaceOnUse")
		{
			var k = PointTools.getDist(x1, y1, x2, y2) / 2;
			matrix.scale(k, k);
			matrix.rotate(Math.atan2(y2 - y1, x2 - x1));
			matrix.translate((x1 + x2) / 2, (y1 + y2) / 2);
		}
		else
		{
			var w = (bounds.maxX - bounds.minX) / 2;
			var h = (bounds.maxY - bounds.minY) / 2;
			var dx = (bounds.maxX - bounds.minX) * (x2-x1);
			var dy = (bounds.maxY - bounds.minY) * (y2-y1);
			var k = Math.sqrt(dx*dx + dy*dy) / 2;
			matrix.scale(k, k);
			matrix.rotate(Math.atan2(y2 - y1, x2 - x1));
			matrix.translate(bounds.minX + (x1 + 1) * w, bounds.minY + (y1 + 1) * h);
		}
		
		matrix.appendMatrix(this.matrix);
		
		return matrix;
	}
}