package models.client;

typedef IPlugins =
{
	function exportDocument(pluginName:String) : Void;
	function importDocument(pluginName:String) : Void;
	function reload(?alertOnSuccess:Bool) : Bool;
};