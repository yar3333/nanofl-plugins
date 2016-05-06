package nanofl.ide;

extern class Importer
{
	function new(pluginName:String, ?params:Dynamic) : Void;
	var pluginName(default, null) : String;
	var params(default, null) : Dynamic;
	function run(api:nanofl.ide.NanoApi, srcFilePath:String, destFilePath:String, documentProperties:nanofl.ide.DocumentProperties, library:nanofl.engine.Library, callb:Bool -> Void) : Void;
}