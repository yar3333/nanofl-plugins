package nanofl.ide.filesystem;

extern class CachedFile
{
	function new(fileSystem:nanofl.engine.FileSystem, libraryDir:String, path:String) : Void;
	var text(default, never) : String;
	var xml(default, never) : htmlparser.HtmlNodeElement;
	var json(default, never) : Dynamic;
	/**
	 * Relative file path.
	 */
	var path(default, null) : String;
	/**
	 * If true - skip this file.
	 */
	var excluded(default, null) : Bool;
	function exclude() : Void;
}