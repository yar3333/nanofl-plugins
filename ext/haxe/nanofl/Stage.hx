package nanofl;

extern class Stage extends createjs.Stage
{
	function new(canvas:Dynamic) : Void;
	override function update(?params:Dynamic) : Void;
}