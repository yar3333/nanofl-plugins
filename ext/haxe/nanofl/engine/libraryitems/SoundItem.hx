package nanofl.engine.libraryitems;

extern class SoundItem extends nanofl.engine.libraryitems.LibraryItem
{
	function new(namePath:String, ext:String) : Void;
	var linkage : String;
	override function getType() : String;
	override function clone() : nanofl.engine.libraryitems.LibraryItem;
	override function getIcon() : String;
	override function save(fileApi:nanofl.engine.FileApi) : Void;
	override function saveToXml(out:nanofl.engine.XmlWriter) : Void;
	function getUrl() : String;
	override function toString() : String;
	static function load(namePath:String, libraryDir:String, fileApi:nanofl.engine.FileApi) : nanofl.engine.libraryitems.SoundItem;
	static function parse(namePath:String, itemNode:htmlparser.HtmlNodeElement) : nanofl.engine.libraryitems.SoundItem;
}