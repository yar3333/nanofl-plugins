package models.common;

extern class Library
{
	function new(libraryDir:String, addEmptyScene:Bool) : Void;
	var libraryDir(default, null) : String;
	function loadItems(fileApi:models.common.FileApi) : Void;
	function parseItems(base:htmlparser.HtmlNodeElement) : Void;
	function addFont(family:String, variants:Array<models.common.FontVariant>) : Void;
	function renameItem(oldNamePath:String, newNamePath:String) : Void;
	function compile(libraryDir:String) : String;
	function addItem(item:models.common.libraryitems.LibraryItem) : models.common.libraryitems.LibraryItem;
	function removeItem(namePath:String) : Void;
	function getSceneItem() : models.common.libraryitems.MovieClipItem;
	function getSceneInstance() : models.common.elements.Instance;
	function getInstancableItems() : Array<models.common.libraryitems.InstancableItem>;
	function getBitmaps() : Array<models.common.libraryitems.BitmapItem>;
	function getSounds() : Array<models.common.libraryitems.SoundItem>;
	function getFonts() : Array<models.common.Font>;
	function getItem(namePath:String) : models.common.libraryitems.LibraryItem;
	function hasItem(namePath:String) : Bool;
	function save(fileApi:models.common.FileApi) : Void;
	function realUrl(url:String) : String;
	function getItems(?includeScene:Bool) : Array<models.common.libraryitems.LibraryItem>;
	function preload(ready:Void -> Void) : Void;
	function getItemCount() : Int;
	static var SCENE_NAME_PATH(default, never) : String;
}