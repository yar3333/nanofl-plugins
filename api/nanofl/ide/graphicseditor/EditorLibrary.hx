package nanofl.ide.graphicseditor;

extern class EditorLibrary
{
	function new(app:nanofl.ide.Application, library:nanofl.ide.library.Library, document:nanofl.ide.Document) : Void;
	var libraryDir(default, never) : String;
	var activeItem : nanofl.engine.libraryitems.LibraryItem;
	function addItems(items:Array<nanofl.engine.libraryitems.LibraryItem>, ?addUndoTransaction:Bool) : Void;
	function canRenameItem(oldNamePath:String, newNamePath:String) : Bool;
	function renameItems(itemRenames:Array<{ var oldNamePath : String; var newNamePath : String; }>) : Void;
	function removeItems(namePaths:Array<String>, ?filesRemoved:Void -> Void) : Void;
	function copyAndChangeDir(libraryDir:String, callb:Void -> Void) : Void;
	function getNextItemName() : String;
	function hasItem(namePath:String) : Bool;
	function addFont(family:String, variants:Array<nanofl.engine.FontVariant>) : Void;
	function preload(ready:Void -> Void) : Void;
	function getItem(namePath:String) : nanofl.engine.libraryitems.LibraryItem;
	function getSceneInstance() : nanofl.engine.elements.Instance;
	function getSceneItem() : nanofl.engine.libraryitems.MovieClipItem;
	function getItems(?includeScene:Bool) : Array<nanofl.engine.libraryitems.LibraryItem>;
	function getRawLibrary() : nanofl.ide.library.Library;
	function getSelectedItemsWithDependencies() : Array<nanofl.engine.libraryitems.LibraryItem>;
	function hasSelected() : Bool;
	function removeSelected() : Void;
	function renameByUser(namePath:String) : Void;
	function deselectAll() : Void;
	function update() : Void;
	function getSelectedItems() : Array<nanofl.engine.libraryitems.LibraryItem>;
	function gotoPrevItem(overwriteSelection:Bool) : Void;
	function gotoNextItem(overwriteSelection:Bool) : Void;
	function showPropertiesPopup() : Void;
	function createEmptySymbol() : Void;
	function createFolder() : Void;
	function importFiles(?paths:Array<String>, ?folderPath:String, ?ready:Void -> Void) : Void;
	function importImages(?folderPath:String, ?ready:Void -> Void) : Void;
	function importSounds(?folderPath:String, ?ready:Void -> Void) : Void;
	function importMeshes(?folderPath:String, ?ready:Void -> Void) : Void;
	function importFont() : Void;
	function uploadFiles(files:Array<js.html.File>, ?folderPath:String, ?callb:Array<nanofl.engine.libraryitems.LibraryItem> -> Void) : Void;
	function loadFilesFromClipboard(callb:Bool -> Void) : Void;
	function copyFilesIntoLibrary(srcDir:String, relativePaths:Array<String>, ?callb:Void -> Void) : Void;
	function selectUnusedItems() : Void;
	function removeUnusedItems() : Void;
	function optimize() : Void;
	function drop(dropEffect:nanofl.ide.draganddrop.DropEffect, data:htmlparser.HtmlNodeElement, folder:String, callb:Array<nanofl.engine.libraryitems.LibraryItem> -> Void) : Void;
	function getWithExandedFolders(items:Array<nanofl.engine.libraryitems.LibraryItem>) : Array<nanofl.engine.libraryitems.LibraryItem>;
	function fixErrors() : Void;
	function publish(settings:nanofl.ide.PublishSettings, destLibraryDir:String, callb:nanofl.ide.library.Library -> Void) : Void;
}