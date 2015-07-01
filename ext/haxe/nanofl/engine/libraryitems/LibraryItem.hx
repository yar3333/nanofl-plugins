package nanofl.engine.libraryitems;

extern class LibraryItem
{
	var namePath(default, null) : String;
	function getType() : String;
	function getIcon() : String;
	function clone() : nanofl.engine.libraryitems.LibraryItem;
	function loadProperties(xml:htmlparser.HtmlNodeElement) : Void;
	function save(fileApi:nanofl.engine.FileApi) : Void;
	function saveToXml(out:htmlparser.XmlBuilder) : Void;
	function getFilePathTemplate() : String;
	function preload(ready:Void -> Void) : Void;
	function duplicate(newNamePath:String) : nanofl.engine.libraryitems.LibraryItem;
	function remove() : Void;
	function equ(item:nanofl.engine.libraryitems.LibraryItem) : Bool;
	function toString() : String;
	static function parse(namePath:String, itemNode:htmlparser.HtmlNodeElement) : nanofl.engine.libraryitems.LibraryItem;
}