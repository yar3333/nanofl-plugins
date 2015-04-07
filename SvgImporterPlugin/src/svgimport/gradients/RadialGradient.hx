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
	
	public var spreadMethod : String;
	
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
		
		spreadMethod = node.getAttr("spreadMethod", base != null ? base.spreadMethod : "pad");
	}
	
	public function getAbsoluteParams(bounds:Bounds) : { cx:Float, cy:Float, fx:Float, fy:Float, r:Float }
	{
		var m = new Matrix();
		
		if (gradientUnits == "userSpaceOnUse")
		{
			m = matrix;
		}
		else
		{
			var w = bounds.maxX - bounds.minX;
			var h = bounds.maxY - bounds.minY;
			m.scale(w * r, h * r);
			m.translate(bounds.minX + w * cx, bounds.minY + h * cy);
		}
		
		var pc = m.transformPoint(cx, cy);
		var pf = m.transformPoint(fx, fy);
		
		return
		{
			cx: pc.x,
			cy: pc.y,
			fx: pf.x,
			fy: pf.y,
			r: r // TODO: calculate r
		};
	}	
}