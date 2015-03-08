package nanofl;

extern class Bitmap extends createjs.Bitmap
{
	function new(symbol:nanofl.engine.libraryitems.InstancableItem) : Void;
	override function toString() : String;
}