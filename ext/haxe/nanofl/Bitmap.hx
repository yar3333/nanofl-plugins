package nanofl;

extern class Bitmap extends createjs.Bitmap
{
	function new(symbol:nanofl.engine.libraryitems.InstancableItem) : Void;
	override function clone(?recursive:Bool) : createjs.DisplayObject;
	override function toString() : String;
}