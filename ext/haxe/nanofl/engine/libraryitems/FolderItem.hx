package nanofl.engine.libraryitems;

extern class FolderItem extends nanofl.engine.libraryitems.LibraryItem
{
	function new(namePath:String) : Void;
	var opened : Bool;
	override function clone() : nanofl.engine.libraryitems.LibraryItem;
	override function getIcon() : String;
	override function toString() : String;
	override function equ(item:nanofl.engine.libraryitems.LibraryItem) : Bool;
}