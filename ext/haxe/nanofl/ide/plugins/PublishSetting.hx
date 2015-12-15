package nanofl.ide.plugins;

extern class PublishSetting
{
	function new(publisher:String, enabled:Bool, params:Dynamic) : Void;
	var publisher : String;
	var enabled : Bool;
	var params : Dynamic;
	function equ(ps:nanofl.ide.plugins.PublishSetting) : Bool;
	function clone() : nanofl.ide.plugins.PublishSetting;
}