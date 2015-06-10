package nanofl.ide;

extern class CachedFile
{
	function new(fileApi:nanofl.engine.FileApi, libraryDir:String, path:String) : Void;
	var path(default, null) : String;
	var excluded(default, null) : Bool;
	function exclude() : Void;
	function getText() : String;
	function getXml() : htmlparser.XmlDocument;
	function getJson() : Dynamic;
}