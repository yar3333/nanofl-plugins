package nanofl.ide;

extern class LibraryTools
{
	static function optimize(library:nanofl.engine.Library) : Void;
	static function getUnusedItems(library:nanofl.engine.Library) : Array<String>;
	static function getItemsContainInstances(library:nanofl.engine.Library, namePaths:Array<String>) : Array<nanofl.engine.libraryitems.LibraryItem>;
}