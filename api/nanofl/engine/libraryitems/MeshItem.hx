package nanofl.engine.libraryitems;

extern class MeshItem extends nanofl.engine.libraryitems.InstancableItem implements nanofl.engine.ITextureItem
{
	function new(namePath:String, ext:String, originalExt:String) : Void;
	var ext : String;
	var originalExt : String;
	var textureAtlas : String;
	var renderAreaSize : Int;
	var loadLights : Bool;
	var scene(default, null) : js.three.Scene;
	var boundingRadius : Float;
	var renderer(default, never) : js.three.Renderer;
	override function getType() : String;
	override function clone() : nanofl.engine.libraryitems.MeshItem;
	override function getIcon() : String;
	override function save(fileSystem:nanofl.engine.FileSystem) : Void;
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
	override function publish(serverUtils:nanofl.ide.filesystem.ServerUtils, settings:nanofl.ide.PublishSettings, destLibraryDir:String, callb:nanofl.engine.libraryitems.LibraryItem -> Void) : Void;
	override function toString() : String;
	static var DEFAULT_RENDER_AREA_SIZE(default, never) : Int;
	static var extensions(default, null) : Array<String>;
	static function load(api:nanofl.ide.NanoApi, namePath:String, originalExt:String, files:Map<String, nanofl.ide.filesystem.CachedFile>) : nanofl.engine.libraryitems.MeshItem;
	static function parse(namePath:String, itemNode:htmlparser.HtmlNodeElement) : nanofl.engine.libraryitems.MeshItem;
}