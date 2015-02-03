package models.common.libraryitems;

extern class LibraryItem
{
	var namePath(default, null) : String;
	function getType() : String;
	function getIcon() : String;
	function clone() : models.common.libraryitems.LibraryItem;
	function save(fileApi:models.common.FileApi) : Void;
	function saveToXml(out:models.common.XmlWriter) : Void;
	function getFilePathTemplate() : String;
	function preload(ready:Void -> Void) : Void;
	function removeInstance(namePath:String) : Void;
	function swapInstance(oldNamePath:String, newNamePath:String) : Void;
	function getUsedItems() : Array<models.common.libraryitems.LibraryItem>;
	function duplicate(newNamePath:String) : models.common.libraryitems.LibraryItem;
	function remove() : Void;
	function toString() : String;
	static function load(namePath:String, libraryDir:String, fileApi:models.common.FileApi) : models.common.libraryitems.LibraryItem;
	static function parse(namePath:String, itemNode:htmlparser.HtmlNodeElement) : models.common.libraryitems.LibraryItem;
}