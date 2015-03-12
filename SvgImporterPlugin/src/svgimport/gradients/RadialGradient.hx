package svgimport.gradients;

import htmlparser.HtmlNodeElement;
import nanofl.engine.geom.Bounds;
using htmlparser.HtmlParserTools;

class RadialGradient extends Gradient
{
	public var cx : Float;
	public var cy : Float;
	public var fx : Float;
	public var fy : Float;
	public var r : Float;
	
	function new(colors:Array<String>, alphas:Array<Float>, ratios:Array<Float>, matrix:Matrix, node:HtmlNodeElement) 
	{
		super(colors, alphas, ratios, matrix);
		
		cx = node.getAttrFloat("cx");
		cy = node.getAttrFloat("cy");
		fx = node.getAttrFloat("fx", cx);
		fy = node.getAttrFloat("fy", cy);
		r = node.getAttrFloat("r", 1);
	}
	
	public function getFullMatrix(bounds:Bounds) : Matrix
	{
		var matrix = new Matrix();
		matrix.translate(cx, cy);
		matrix.scale(r, r);
		
		matrix.appendMatrix(matrix);
		
		return matrix.clone();
	}
}