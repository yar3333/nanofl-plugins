package nanofl.engine;

typedef Render =
{
	function beginBitmapFill(image:Dynamic, repeat:String, matrix:createjs.Matrix2D) : nanofl.engine.Render;
	function beginBitmapStroke(image:Dynamic, repeat:String) : nanofl.engine.Render;
	function beginFill(color:String) : nanofl.engine.Render;
	function beginLinearGradientFill(colors:Array<String>, ratios:Array<Float>, x0:Float, y0:Float, x1:Float, y1:Float) : nanofl.engine.Render;
	function beginLinearGradientStroke(colors:Array<String>, ratios:Array<Float>, x0:Float, y0:Float, x1:Float, y1:Float) : nanofl.engine.Render;
	function beginRadialGradientFill(colors:Array<String>, ratios:Array<Float>, fx:Float, fy:Float, fr:Float, cx:Float, cy:Float, cr:Float) : nanofl.engine.Render;
	function beginRadialGradientStroke(colors:Array<String>, ratios:Array<Float>, fx:Float, fy:Float, fr:Float, cx:Float, cy:Float, cr:Float) : nanofl.engine.Render;
	function beginStroke(color:String) : nanofl.engine.Render;
	function curveTo(x0:Float, y0:Float, x1:Float, y1:Float) : nanofl.engine.Render;
	function endFill() : nanofl.engine.Render;
	function endStroke() : nanofl.engine.Render;
	function lineTo(x:Float, y:Float) : nanofl.engine.Render;
	function moveTo(x:Float, y:Float) : nanofl.engine.Render;
	function setStrokeStyle(thickness:Float, caps:String, joints:String, miterLimit:Float, ignoreScale:Bool) : nanofl.engine.Render;
};