package nanofl;

extern class DisplayObjectTools
{
	static function cache(obj:createjs.DisplayObject) : Void;
	static function uncache(obj:createjs.DisplayObject) : Void;
	static function getBounds(obj:createjs.DisplayObject, ?ignoreSelf:Bool) : createjs.Rectangle;
	static function callMethod(parent:createjs.DisplayObject, name:String) : Void;
	static function dump(obj:createjs.DisplayObject, ?level:Int) : Void;
}