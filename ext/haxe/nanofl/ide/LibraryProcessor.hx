package nanofl.ide;

extern class LibraryProcessor
{
	function new(library:nanofl.engine.Library) : Void;
	function optimize() : Void;
	function getUnused() : Array<String>;
}