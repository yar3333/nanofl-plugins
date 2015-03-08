package nanofl.ide;

extern class EditorLibrary
{
	function new(app:nanofl.ide.Application, library:nanofl.engine.Library) : Void;
	var activeItem(get, never) : nanofl.engine.libraryitems.LibraryItem;
	function renameItem(namePath:String, newNamePath:String) : Bool;
	function removeItems(namePaths:Array<String>) : Void;
	function copyAndChangeDir(libraryDir:String, ?callb:Void -> Void) : Void;
	function getNextItemName() : String;
	function hasItem(namePath:String) : Bool;
	function addItem(item:nanofl.engine.libraryitems.LibraryItem) : Void;
	function addFont(family:String, variants:Array<nanofl.engine.FontVariant>) : Void;
	function preload(ready:Void -> Void) : Void;
	function getItem(namePath:String) : nanofl.engine.libraryitems.LibraryItem;
	function getSceneInstance() : nanofl.engine.elements.Instance;
	function getSceneItem() : nanofl.engine.libraryitems.MovieClipItem;
	function getItems() : Array<nanofl.engine.libraryitems.LibraryItem>;
	function getRawLibrary() : nanofl.engine.Library;
	function getForClipboard() : String;
	function pasteFromXml(data:String) : Bool;
	function hasSelected() : Bool;
	function removeSelected() : Void;
	function renameByUser(namePath:String) : Bool;
	function deselectAll() : Void;
	function update() : Void;
	function getSelectedItems() : Array<nanofl.engine.libraryitems.LibraryItem>;
	function gotoPrevItem(overwriteSelection:Bool) : Void;
	function gotoNextItem(overwriteSelection:Bool) : Void;
	function showPropertiesPopup() : Void;
	function createEmptySymbol() : Void;
	function createFolder() : Void;
	function importImagesFromPaths(paths:Array<String>, folderPath:String, ?ready:Void -> Void) : Void;
	function importLibraryItemsFromFiles(files:Array<js.html.File>, folderPath:String, ?callb:Array<nanofl.engine.libraryitems.LibraryItem> -> Void) : Void;
}