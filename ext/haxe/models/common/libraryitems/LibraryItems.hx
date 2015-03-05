package models.common.libraryitems;

extern class LibraryItems
{
	static function saveToXml(items:Array<models.common.libraryitems.LibraryItem>, out:models.common.XmlWriter) : Void;
	static function loadFromXml(xml:htmlparser.HtmlNodeElement) : Array<models.common.libraryitems.LibraryItem>;
}