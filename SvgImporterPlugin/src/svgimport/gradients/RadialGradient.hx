package svgimport.gradients;

import htmlparser.HtmlNodeElement;
import nanofl.engine.geom.Bounds;
import nanofl.engine.geom.Matrix;
using htmlparser.HtmlParserTools;
using svgimport.XmlTools;

class RadialGradient extends Gradient
{
	public var cx : Float;
	public var cy : Float;
	public var fx : Float;
	public var fy : Float;
	public var r : Float;
	
	function new(node:HtmlNodeElement, baseType:GradientType) 
	{
		super(node, baseType);
		
		var base : RadialGradient = null;
		if (baseType != null)
		{
			switch (baseType)
			{
				case GradientType.RADIAL(grad): base = grad;
				case _:
			};
		}
		
		cx = node.getFloatValue("cx", base != null ? base.cx : 0.5);
		cy = node.getFloatValue("cy", base != null ? base.cy : 0.5);
		fx = node.getFloatValue("fx", base != null ? base.fx : cx);
		fy = node.getFloatValue("fy", base != null ? base.fy : cy);
		r  = node.getFloatValue("r",  base != null ? base.r  : 0.5);
	}
	
	public function getFullMatrix(bounds:Bounds) : Matrix
	{
		var m = new Matrix();
		
		if (gradientUnits == "" || gradientUnits == "objectBoundingBox")
		{
			var w = bounds.maxX - bounds.minX;
			var h = bounds.maxY - bounds.minY;
			m.scale(w * r, h * r);
			m.translate(bounds.minX + w * cx, bounds.minY + h * cy);
		}
		else if (gradientUnits == "userSpaceOnUse")
		{
			m.scale(r, r);
			m.translate(cx, cy);
		}
		else
		{
			trace("Unknow gradientUnits '" + gradientUnits + "'.");
		}
		
		m.appendMatrix(matrix);
		
		return m;
	}
}