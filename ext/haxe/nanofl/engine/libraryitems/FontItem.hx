package nanofl.engine.libraryitems;

extern class FontItem extends nanofl.engine.libraryitems.LibraryItem
{
	function new(namePath:String, variants:Array<nanofl.engine.FontVariant>) : Void;
	var variants : Array<nanofl.engine.FontVariant>;
	override function getType() : String;
	override function clone() : nanofl.engine.libraryitems.LibraryItem;
	override function getIcon() : String;
	override function save(fileApi:nanofl.engine.FileApi) : Void;
	override function saveToXml(out:nanofl.engine.XmlWriter) : Void;
	function toFont() : nanofl.engine.Font;
	override function preload(ready:Void -> Void) : Void;
	override function toString() : String;
	static function load(namePath:String, libraryDir:String, fileApi:nanofl.engine.FileApi) : nanofl.engine.libraryitems.FontItem;
	static function parse(namePath:String, fontNode:htmlparser.HtmlNodeElement) : nanofl.engine.libraryitems.FontItem;
}