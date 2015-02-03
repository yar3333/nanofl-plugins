package models.common.libraryitems;

extern class FontItem extends models.common.libraryitems.LibraryItem
{
	function new(namePath:String, variants:Array<models.common.FontVariant>) : Void;
	var variants : Array<models.common.FontVariant>;
	override function getType() : String;
	override function clone() : models.common.libraryitems.LibraryItem;
	override function getIcon() : String;
	override function save(fileApi:models.common.FileApi) : Void;
	override function saveToXml(out:models.common.XmlWriter) : Void;
	function toFont() : models.common.Font;
	override function preload(ready:Void -> Void) : Void;
	override function toString() : String;
	static function load(namePath:String, libraryDir:String, fileApi:models.common.FileApi) : models.common.libraryitems.FontItem;
	static function parse(namePath:String, fontNode:htmlparser.HtmlNodeElement) : models.common.libraryitems.FontItem;
}