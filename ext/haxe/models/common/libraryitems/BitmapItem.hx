package models.common.libraryitems;

extern class BitmapItem extends models.common.libraryitems.InstancableItem
{
	function new(namePath:String, ext:String) : Void;
	var image(default, null) : js.html.Image;
	override function getType() : String;
	override function clone() : models.common.libraryitems.LibraryItem;
	override function getIcon() : String;
	override function save(fileApi:models.common.FileApi) : Void;
	override function saveToXml(out:models.common.XmlWriter) : Void;
	function getUrl() : String;
	override function preload(ready:Void -> Void) : Void;
	override function createDisplayObject(initFrameIndex:Int, childFrameIndexes:Array<{ var frameIndex : Int; var element : models.common.IPathElement; }>) : createjs.DisplayObject;
	override function updateDisplayObject(dispObj:createjs.DisplayObject, childFrameIndexes:Array<{ var frameIndex : Int; var element : models.common.IPathElement; }>) : Void;
	override function getDisplayObjectClassName() : String;
	override function toString() : String;
	static function load(namePath:String, libraryDir:String, fileApi:models.common.FileApi) : models.common.libraryitems.BitmapItem;
	static function parse(namePath:String, itemNode:htmlparser.HtmlNodeElement) : models.common.libraryitems.BitmapItem;
}