package nanofl.ide;

extern class Importer
{
	function new(pluginName:String, ?params:Dynamic) : Void;
	var pluginName(default, null) : String;
	var params(default, null) : Dynamic;
	function run(fileApi:nanofl.engine.FileApi, srcFilePath:String, destFilePath:String, documentProperties:nanofl.engine.DocumentProperties, library:nanofl.engine.Library, fonts:Array<String>, callb:Bool -> Void) : Void;
	static function getPrefKey(pluginName:String) : String;
}