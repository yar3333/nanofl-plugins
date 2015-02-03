package models.common.libraryitems;

extern class SoundItem extends models.common.libraryitems.LibraryItem
{
	function new(namePath:String, ext:String) : Void;
	var linkage : String;
	override function getType() : String;
	override function clone() : models.common.libraryitems.LibraryItem;
	override function getIcon() : String;
	override function save(fileApi:models.common.FileApi) : Void;
	override function saveToXml(out:models.common.XmlWriter) : Void;
	function getUrl() : String;
	override function toString() : String;
	static function load(namePath:String, libraryDir:String, fileApi:models.common.FileApi) : models.common.libraryitems.SoundItem;
	static function parse(namePath:String, itemNode:htmlparser.HtmlNodeElement) : models.common.libraryitems.SoundItem;
}