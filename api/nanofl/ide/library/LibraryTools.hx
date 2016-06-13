package nanofl.ide.library;

extern class LibraryTools
{
	static function optimize(library:nanofl.ide.library.Library) : Void;
	static function getUnusedItems(library:nanofl.ide.library.Library) : Array<String>;
	static function getItemsContainInstances(library:nanofl.ide.library.Library, namePaths:Array<String>) : Array<nanofl.engine.libraryitems.LibraryItem>;
	static function hasEquItems(library:nanofl.ide.library.Library, items:Array<nanofl.engine.libraryitems.LibraryItem>) : Bool;
}