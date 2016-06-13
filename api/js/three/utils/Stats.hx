package js.three.utils;

@:native("Stats") extern class Stats
{
	function new() : Void;
	var domElement : js.html.Element;
	function setMode(m:Int) : Void;
	function begin() : Void;
	function end() : Void;
	function update() : Void;
}