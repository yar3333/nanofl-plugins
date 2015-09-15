package nanofl.engine;

extern class Library
{
	function new(libraryDir:String, ?items:Array<nanofl.engine.libraryitems.LibraryItem>) : Void;
	var libraryDir(default, null) : String;
	function addSceneWithFrame(?elements:Array<nanofl.engine.elements.Element>, ?layerName:String) : nanofl.engine.libraryitems.MovieClipItem;
	function loadItems(fileApi:nanofl.engine.FileApi) : Void;
	function parseItems(base:htmlparser.HtmlNodeElement) : Void;
	function addFont(family:String, variants:Array<nanofl.engine.FontVariant>) : Void;
	function canRenameItem(oldNamePath:String, newNamePath:String) : Bool;
	function renameItem(oldNamePath:String, newNamePath:String) : Void;
	function compile(libraryDir:String) : { var filterCodes : Map<String, String>; var serializedLibrary : String; };
	function removeUnusedItems() : Void;
	function optimize() : Void;
	function addItem<T>(item:T) : T;
	function removeItem(namePath:String) : Void;
	function getSceneItem() : nanofl.engine.libraryitems.MovieClipItem;
	function getSceneInstance() : nanofl.engine.elements.Instance;
	function getInstancableItems() : Array<nanofl.engine.libraryitems.InstancableItem>;
	function getBitmaps() : Array<nanofl.engine.libraryitems.BitmapItem>;
	function getSounds() : Array<nanofl.engine.libraryitems.SoundItem>;
	function getFonts() : Array<nanofl.engine.Font>;
	function getItem(namePath:String) : nanofl.engine.libraryitems.LibraryItem;
	function hasItem(namePath:String) : Bool;
	function save(fileApi:nanofl.engine.FileApi) : Void;
	function realUrl(url:String) : String;
	function getItems(?includeScene:Bool) : Array<nanofl.engine.libraryitems.LibraryItem>;
	function preload(ready:Void -> Void) : Void;
	function clone() : nanofl.engine.Library;
	function getItemCount() : Int;
	function getItemsInFolder(folderNamePath:String) : Array<nanofl.engine.libraryitems.LibraryItem>;
	function equ(library:nanofl.engine.Library) : Bool;
	static var SCENE_NAME_PATH(default, never) : String;
	static function createWithScene(?libraryDir:String, ?elements:Array<nanofl.engine.elements.Element>, ?layerName:String) : nanofl.engine.Library;
}