package nanofl.ide;

extern class LibraryTools
{
	static function optimize(library:nanofl.ide.Library) : Void;
	static function getUnusedItems(library:nanofl.ide.Library) : Array<String>;
	static function getItemsContainInstances(library:nanofl.ide.Library, namePaths:Array<String>) : Array<nanofl.engine.libraryitems.LibraryItem>;
	static function hasEquItems(library:nanofl.ide.Library, items:Array<nanofl.engine.libraryitems.LibraryItem>) : Bool;
}