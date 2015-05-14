package;

import js.html.CanvasElement;

extern class StackBlur
{
	private static function __init__() : Void
	{
		haxe.macro.Compiler.includeFile("StackBlur.js");
	}
	
	public static function stackBlurImage(imageID:String, canvasID:String, radius:Int, blurAlphaChannel:Bool) : Void;
	public static function stackBlurCanvasRGBA(canvas:CanvasElement, x:Float, y:Float, width:Float, height:Float, radius:Int) : Void;
	public static function stackBlurCanvasRGB(canvas:CanvasElement, x:Float, y:Float, width:Float, height:Float, radius:Int) : Void;
}