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
	function removeInstance(namePath:String) : Void;
	function swapInstance(oldNamePath:String, newNamePath:String) : Void;
	function getUsedItems() : Array<nanofl.engine.libraryitems.LibraryItem>;
	function duplicate(newNamePath:String) : nanofl.engine.libraryitems.LibraryItem;
	function remove() : Void;
	function toString() : String;
	static function parse(namePath:String, itemNode:htmlparser.HtmlNodeElement) : nanofl.engine.libraryitems.LibraryItem;
}