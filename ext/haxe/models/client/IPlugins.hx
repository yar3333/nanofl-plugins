package models.client;

typedef IPlugins =
{
	function exportDocument(pluginName:String, ?destFilePath:String, ?callb:Bool -> Void) : Void;
	function importDocument(pluginName:String, ?srcFilePath:String, ?callb:models.client.Document -> Void) : Void;
	function reload(?alertOnSuccess:Bool) : Bool;
};