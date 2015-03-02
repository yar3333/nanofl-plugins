package svgimport;

class Gfx
{
	public function new() { }

	public function geometryOnly() return false;
	public function size(width:Float, height:Float) { }
	public function beginGradientFill(grad:Gradient) { }

	public function beginFill(color:Int, alpha:Float) { }
	public function endFill() { }

	public function lineStyle(style:LineStyle) { }
	public function endLineStyle() { }

	public function moveTo(x:Float, y:Float) { }
	public function lineTo(x:Float, y:Float) { }
	public function curveTo(cx:Float, cy:Float, x:Float, y:Float) { }

	public function renderText(text:Text) { }

	public function eof() {}
}



