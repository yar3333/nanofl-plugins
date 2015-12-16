package nanofl.ide.plugins;

extern class PublishSetting
{
	function new(publisher:String, enabled:Bool, optimizations:nanofl.ide.LibraryOptimizationParams, params:Dynamic) : Void;
	var publisher : String;
	var enabled : Bool;
	var optimizations : nanofl.ide.LibraryOptimizationParams;
	var params : Dynamic;
	function equ(ps:nanofl.ide.plugins.PublishSetting) : Bool;
	function clone() : nanofl.ide.plugins.PublishSetting;
}