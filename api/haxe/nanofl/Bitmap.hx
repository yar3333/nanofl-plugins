package nanofl;

extern class Bitmap extends createjs.Bitmap
{
	function new(symbol:nanofl.engine.libraryitems.InstancableItem) : Void;
	override function clone(?recursive:Bool) : nanofl.Bitmap;
	override function toString() : String;
}