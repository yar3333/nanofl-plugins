package nanofl.engine;

extern class Console
{
	function new() : Void;
	function log(v:Dynamic) : Void;
	function info(v:Dynamic) : Void;
	function warn(v:Dynamic) : Void;
	function error(v:Dynamic) : Void;
	static var console(default, never) : nanofl.engine.Console;
}