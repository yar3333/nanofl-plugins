package nanofl.engine.libraryitems;

extern class MeshItem extends nanofl.engine.libraryitems.InstancableItem implements nanofl.engine.ITextureItem
{
	function new(namePath:String, ext:String, originalExt:String) : Void;
	var ext : String;
	var originalExt : String;
	var textureAtlas : String;
	var size : Int;
	var data(default, null) : { var geometry : js.three.Geometry; var materials : Array<js.three.Material>; };
	override function getType() : String;
	override function clone() : nanofl.engine.libraryitems.MeshItem;
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
	override function generateOptimizedFiles(fileApi:nanofl.engine.FileApi, optimizations:nanofl.ide.PublishOptimizations, destDir:String) : Array<{ var relPath : String; var baseDir : String; }>;
	override function toString() : String;
	static function load(fileApi:nanofl.engine.FileApi, relFilePath:String, originalExt:String, files:Map<String, nanofl.ide.CachedFile>) : nanofl.engine.libraryitems.MeshItem;
	static function parse(namePath:String, itemNode:htmlparser.HtmlNodeElement) : nanofl.engine.libraryitems.MeshItem;
}