package nanofl.ide.library;

extern class LibraryItems
{
	static function load(api:nanofl.ide.NanoApi, libraryDir:String, relativeFilePaths:Array<String>) : Array<nanofl.engine.libraryitems.LibraryItem>;
	static function saveToXml(items:Array<nanofl.engine.libraryitems.LibraryItem>, out:htmlparser.XmlBuilder) : Void;
	static function loadFromXml(xml:htmlparser.HtmlNodeElement) : Array<nanofl.engine.libraryitems.LibraryItem>;
	static function getFiles(items:Array<nanofl.engine.libraryitems.LibraryItem>) : Array<String>;
	static function drag(document:nanofl.ide.Document, item:nanofl.engine.libraryitems.LibraryItem, items:Array<nanofl.engine.libraryitems.LibraryItem>, out:htmlparser.XmlBuilder) : nanofl.ide.draganddrop.AllowedDropEffect;
	static function drop(dropEffect:nanofl.ide.draganddrop.DropEffect, data:htmlparser.HtmlNodeElement, document:nanofl.ide.Document, folder:String, callb:Array<nanofl.engine.libraryitems.LibraryItem> -> Void) : Void;
}