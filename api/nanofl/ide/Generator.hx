package nanofl.ide;

extern class Generator
{
	function new(fileSystem:nanofl.engine.FileSystem, filePath:String, library:nanofl.ide.library.Library) : Void;
	function generate() : Void;
}