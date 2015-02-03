package models.common.libraryitems;

extern class FolderItem extends models.common.libraryitems.LibraryItem
{
	function new(namePath:String) : Void;
	var opened : Bool;
	override function clone() : models.common.libraryitems.LibraryItem;
	override function getIcon() : String;
	override function toString() : String;
}