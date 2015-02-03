package nanofl;

extern class GraphicsTools
{
	static function drawDashedLine(g:createjs.Graphics, x1:Float, y1:Float, x2:Float, y2:Float, color1:String, ?color2:String, ?dashLen:Float) : createjs.Graphics;
	static function drawDashedRect(g:createjs.Graphics, x1:Float, y1:Float, x2:Float, y2:Float, color1:String, ?color2:String, ?dashLen:Float) : createjs.Graphics;
}