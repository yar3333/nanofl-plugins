package nanofl.engine.libraryitems;

extern class FolderItem extends nanofl.engine.libraryitems.LibraryItem
{
	function new(namePath:String) : Void;
	var opened : Bool;
	override function clone() : nanofl.engine.libraryitems.FolderItem;
	override function save(fileApi:nanofl.engine.FileApi) : Void;
	override function getIcon() : String;
	override function toString() : String;
	override function equ(item:nanofl.engine.libraryitems.LibraryItem) : Bool;
}