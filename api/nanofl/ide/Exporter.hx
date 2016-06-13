package nanofl.ide;

extern class Exporter
{
	function new(pluginName:String, params:Dynamic) : Void;
	var pluginName(default, null) : String;
	var params(default, null) : Dynamic;
	function run(api:nanofl.ide.NanoApi, srcFilePath:String, destFilePath:String, documentProperties:nanofl.ide.DocumentProperties, library:nanofl.ide.library.Library) : Bool;
}