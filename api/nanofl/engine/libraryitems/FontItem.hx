package nanofl.engine.libraryitems;

extern class FontItem extends nanofl.engine.libraryitems.LibraryItem
{
	function new(namePath:String, variants:Array<nanofl.engine.FontVariant>) : Void;
	var variants : Array<nanofl.engine.FontVariant>;
	override function getType() : String;
	override function clone() : nanofl.engine.libraryitems.FontItem;
	override function getIcon() : String;
	override function save(fileSystem:nanofl.engine.FileSystem) : Void;
	override function saveToXml(out:htmlparser.XmlBuilder) : Void;
	function toFont() : nanofl.engine.Font;
	override function preload(ready:Void -> Void) : Void;
	function addVariant(v:nanofl.engine.FontVariant) : Void;
	override function publish(serverUtils:nanofl.ide.filesystem.ServerUtils, settings:nanofl.ide.PublishSettings, destLibraryDir:String, callb:nanofl.engine.libraryitems.LibraryItem -> Void) : Void;
	override function equ(item:nanofl.engine.libraryitems.LibraryItem) : Bool;
	override function toString() : String;
	static function parse(namePath:String, itemNode:htmlparser.HtmlNodeElement) : nanofl.engine.libraryitems.FontItem;
}