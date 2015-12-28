package nanofl.engine.libraryitems;

extern class ThreeItem extends nanofl.engine.libraryitems.InstancableItem implements nanofl.engine.ITextureItem
{
	function new(namePath:String, originalExt:String) : Void;
	var originalExt : String;
	var textureAtlas : String;
	var data(default, null) : { var geometry : js.three.Geometry; var materials : Array<js.three.Material>; };
	override function getType() : String;
	override function clone() : nanofl.engine.libraryitems.ThreeItem;
	override function getIcon() : String;
	override function save(fileApi:nanofl.engine.FileApi) : Void;
	override function saveToXml(out:htmlparser.XmlBuilder) : Void;
	override function loadProperties(xml:htmlparser.HtmlNodeElement) : Void;
	function getUrl() : String;
	override function preload(ready:Void -> Void) : Void;
	override function createDisplayObject(initFrameIndex:Int, childFrameIndexes:Array<{ var frameIndex : Int; var element : nanofl.engine.IPathElement; }>) : createjs.DisplayObject;
	override function updateDisplayObject(dispObj:createjs.DisplayObject, childFrameIndexes:Array<{ var frameIndex : Int; var element : nanofl.engine.IPathElement; }>) : Void;
	override function getDisplayObjectClassName() : String;
	override function equ(item:nanofl.engine.libraryitems.LibraryItem) : Bool;
	override function getFilePathToRunWithEditor() : String;
	override function getLibraryFilePaths() : Array<String>;
	override function getNearestPoint(pos:nanofl.engine.geom.Point) : nanofl.engine.geom.Point;
	override function getUsedSymbolNamePaths() : Array<String>;
	override function toString() : String;
	static function load(fileApi:nanofl.engine.FileApi, relJsonFilePath:String, originalExt:String, files:Map<String, nanofl.ide.CachedFile>) : nanofl.engine.libraryitems.ThreeItem;
	static function parse(namePath:String, itemNode:htmlparser.HtmlNodeElement) : nanofl.engine.libraryitems.ThreeItem;
}