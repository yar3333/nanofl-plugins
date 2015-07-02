package nanofl.ide;

extern class LibraryTools
{
	static function optimize(library:nanofl.engine.Library) : Void;
	static function getUnusedItems(library:nanofl.engine.Library) : Array<String>;
}