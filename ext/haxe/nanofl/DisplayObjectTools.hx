package nanofl;

extern class DisplayObjectTools
{
	static var autoHitArea : Bool;
	static function smartCache(obj:createjs.DisplayObject) : Void;
	static function smartUncache(obj:createjs.DisplayObject) : Void;
	static function getOuterBounds(obj:createjs.DisplayObject, ?ignoreSelf:Bool) : createjs.Rectangle;
	static function getInnerBounds(obj:createjs.DisplayObject) : createjs.Rectangle;
	static function callMethod(parent:createjs.DisplayObject, name:String) : Void;
	static function smartHitTest(obj:createjs.DisplayObject, x:Float, y:Float, ?minAlpha:Int) : Bool;
	static function dump(obj:createjs.DisplayObject, ?level:Int) : Void;
}