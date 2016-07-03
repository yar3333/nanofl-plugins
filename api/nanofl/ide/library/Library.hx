package nanofl.ide.library;

extern class Library extends nanofl.engine.Library
{
	function new(libraryDir:String, ?items:Array<nanofl.engine.libraryitems.LibraryItem>) : Void;
	override function clone() : nanofl.ide.library.Library;
	function loadItems(api:nanofl.ide.NanoApi) : Void;
	function parseItems(base:htmlparser.HtmlNodeElement) : Void;
	function addFont(family:String, variants:Array<nanofl.engine.FontVariant>) : Void;
	function canRenameItem(oldNamePath:String, newNamePath:String) : Bool;
	function renameItem(oldNamePath:String, newNamePath:String) : Void;
	function compile(libraryDir:String) : { var filterCodes : Map<String, String>; var serializedLibrary : String; };
	function removeUnusedItems() : Void;
	function optimize() : Void;
	static var SCENE_NAME_PATH(default, never) : String;
	static function createWithScene(?libraryDir:String, ?elements:Array<nanofl.engine.elements.Element>, ?layerName:String) : nanofl.ide.library.Library;
}