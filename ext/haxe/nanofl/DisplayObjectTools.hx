package nanofl;

extern class DisplayObjectTools
{
	static function smartCache(obj:createjs.DisplayObject) : Void;
	static function smartUncache(obj:createjs.DisplayObject) : Void;
	static function callMethod(parent:createjs.DisplayObject, name:String) : Void;
}