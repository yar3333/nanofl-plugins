package nanofl.engine.libraryitems;

extern class FolderItem extends nanofl.engine.libraryitems.LibraryItem
{
	function new(namePath:String) : Void;
	var opened : Bool;
	override function clone() : nanofl.engine.libraryitems.FolderItem;
	override function save(fileSystem:nanofl.engine.FileSystem) : Void;
	override function saveToXml(out:htmlparser.XmlBuilder) : Void;
	override function getIcon() : String;
	override function toString() : String;
	override function equ(item:nanofl.engine.libraryitems.LibraryItem) : Bool;
	override function getLibraryFilePaths() : Array<String>;
	static function parse(namePath:String, itemNode:htmlparser.HtmlNodeElement) : nanofl.engine.libraryitems.FolderItem;
}