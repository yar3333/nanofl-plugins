package svgimport.gradients;

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
		var w = (bounds.maxX - bounds.minX) / 2;
		var h = (bounds.maxY - bounds.minY) / 2;
		
		var matrix = new Matrix();
		matrix.scale(w * (x2 - x1), h * (y2 - y1));
		matrix.rotate(Math.atan2(y2 - y1, x2 - x1));
		matrix.translate(bounds.minX + (x1 + 1) * w, bounds.minY + (y1 + 1) * h);
		
		matrix.appendMatrix(this.matrix);
		
		return matrix;
	}
}