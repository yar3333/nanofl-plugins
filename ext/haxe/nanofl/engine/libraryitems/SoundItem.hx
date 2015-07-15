package nanofl.engine.libraryitems;

extern class SoundItem extends nanofl.engine.libraryitems.LibraryItem
{
	function new(namePath:String, ext:String) : Void;
	var linkage : String;
	override function getType() : String;
	override function clone() : nanofl.engine.libraryitems.SoundItem;
	override function getIcon() : String;
	override function save(fileApi:nanofl.engine.FileApi) : Void;
	override function saveToXml(out:htmlparser.XmlBuilder) : Void;
	override function loadProperties(xml:htmlparser.HtmlNodeElement) : Void;
	function getUrl() : String;
	override function equ(item:nanofl.engine.libraryitems.LibraryItem) : Bool;
	override function toString() : String;
	static function parse(namePath:String, itemNode:htmlparser.HtmlNodeElement) : nanofl.engine.libraryitems.SoundItem;
}