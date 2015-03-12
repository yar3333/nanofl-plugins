package svgimport.gradients;

import htmlparser.HtmlNodeElement;
import nanofl.engine.geom.Bounds;
using htmlparser.HtmlParserTools;

class LinearGradient extends Gradient
{
	public var x1 : Float;
	public var y1 : Float;
	public var x2 : Float;
	public var y2 : Float;
	
	function new(colors:Array<String>, alphas:Array<Float>, ratios:Array<Float>, matrix:Matrix, node:HtmlNodeElement) 
	{
		super(colors, alphas, ratios, matrix);
		
		x1 = node.getAttrFloat("x1");
		y1 = node.getAttrFloat("y1");
		x2 = node.getAttrFloat("x2");
		y2 = node.getAttrFloat("y2");
		
	}
	
	public function getFullMatrix(bounds:Bounds) : Matrix
	{
		var sx = (bounds.maxX - bounds.minX) / 2;
		var sy = (bounds.maxY - bounds.minY) / 2;
		
		var tx = (bounds.minX + bounds.maxX) / 2;
		var ty = (bounds.minY + bounds.maxY) / 2;
		
		var angle = Math.atan2(y2 - y1, x2 - x1);
		
		var matrix = new Matrix();
		matrix.scale(sx, sy);
		matrix.rotate(angle);
		matrix.translate(tx, ty);
		
		matrix.appendMatrix(matrix);
		
		return matrix.clone();
	}
}