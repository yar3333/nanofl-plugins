package nanofl.ide;

extern class CachedFile
{
	function new(fileApi:nanofl.engine.FileApi, libraryDir:String, path:String) : Void;
	/**
	 * Relative file path.
	 */
	var path(default, null) : String;
	/**
	 * If true - skip this file.
	 */
	var excluded(default, null) : Bool;
	function exclude() : Void;
	function getText() : String;
	function getXml() : htmlparser.XmlDocument;
	function getJson() : Dynamic;
}