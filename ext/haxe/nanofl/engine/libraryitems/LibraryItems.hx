package nanofl.engine.libraryitems;

extern class LibraryItems
{
	static function saveToXml(items:Array<nanofl.engine.libraryitems.LibraryItem>, out:nanofl.engine.XmlWriter) : Void;
	static function loadFromXml(xml:htmlparser.HtmlNodeElement) : Array<nanofl.engine.libraryitems.LibraryItem>;
}