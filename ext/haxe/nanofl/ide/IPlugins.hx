package nanofl.ide;

typedef IPlugins =
{
	function exportDocument(pluginName:String, ?destFilePath:String, ?callb:Bool -> Void) : Void;
	function importDocument(pluginName:String, ?srcFilePath:String, ?callb:nanofl.ide.Document -> Void) : Void;
	function reload(?alertOnSuccess:Bool) : Bool;
};