package models.client;

extern class EditorLibrary
{
	function new(app:models.client.Application, library:models.common.Library) : Void;
	var activeItem(get, never) : models.common.libraryitems.LibraryItem;
	function renameItem(namePath:String, newNamePath:String) : Bool;
	function removeItems(namePaths:Array<String>) : Void;
	function copyAndChangeDir(libraryDir:String, ?callb:Void -> Void) : Void;
	function getNextItemName() : String;
	function hasItem(namePath:String) : Bool;
	function addItem(item:models.common.libraryitems.LibraryItem) : Void;
	function addFont(family:String, variants:Array<models.common.FontVariant>) : Void;
	function preload(ready:Void -> Void) : Void;
	function getItem(namePath:String) : models.common.libraryitems.LibraryItem;
	function getSceneInstance() : models.common.elements.Instance;
	function getSceneItem() : models.common.libraryitems.MovieClipItem;
	function getItems() : Array<models.common.libraryitems.LibraryItem>;
	function getRawLibrary() : models.common.Library;
	function getForClipboard() : String;
	function pasteFromXml(data:String) : Bool;
	function hasSelected() : Bool;
	function removeSelected() : Void;
	function renameByUser(namePath:String) : Bool;
	function deselectAll() : Void;
	function update() : Void;
	function getSelectedItems() : Array<models.common.libraryitems.LibraryItem>;
	function gotoPrevItem(overwriteSelection:Bool) : Void;
	function gotoNextItem(overwriteSelection:Bool) : Void;
	function showPropertiesPopup() : Void;
	function createEmptySymbol() : Void;
	function createFolder() : Void;
	function importImagesFromPaths(paths:Array<String>, folderPath:String, ?ready:Void -> Void) : Void;
	function importLibraryItemsFromFiles(files:Array<js.html.File>, folderPath:String, ?callb:Array<models.common.libraryitems.LibraryItem> -> Void) : Void;
}