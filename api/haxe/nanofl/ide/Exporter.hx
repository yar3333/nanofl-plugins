package nanofl.ide;

extern class Exporter
{
	function new(pluginName:String, params:Dynamic) : Void;
	var pluginName(default, null) : String;
	var params(default, null) : Dynamic;
	function run(api:nanofl.ide.NanoApi, srcFilePath:String, destFilePath:String, documentProperties:nanofl.engine.DocumentProperties, library:nanofl.engine.Library) : Bool;
}