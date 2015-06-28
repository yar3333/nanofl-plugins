package nanofl.engine.libraryitems;

extern class BitmapItem extends nanofl.engine.libraryitems.InstancableItem implements nanofl.engine.ITextureItem
{
	function new(namePath:String, ext:String) : Void;
	var textureAtlas : String;
	var image(default, null) : js.html.Image;
	override function getType() : String;
	override function clone() : nanofl.engine.libraryitems.LibraryItem;
	override function getIcon() : String;
	override function save(fileApi:nanofl.engine.FileApi) : Void;
	override function saveToXml(out:htmlparser.XmlBuilder) : Void;
	override function loadProperties(xml:htmlparser.HtmlNodeElement) : Void;
	function getUrl() : String;
	override function preload(ready:Void -> Void) : Void;
	override function createDisplayObject(initFrameIndex:Int, childFrameIndexes:Array<{ var frameIndex : Int; var element : nanofl.engine.IPathElement; }>) : createjs.DisplayObject;
	override function updateDisplayObject(dispObj:createjs.DisplayObject, childFrameIndexes:Array<{ var frameIndex : Int; var element : nanofl.engine.IPathElement; }>) : Void;
	override function getDisplayObjectClassName() : String;
	override function toString() : String;
	static function parse(namePath:String, itemNode:htmlparser.HtmlNodeElement) : nanofl.engine.libraryitems.BitmapItem;
}