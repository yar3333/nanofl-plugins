package nanofl.engine;

extern class Guide
{
	function new(shape:nanofl.engine.elements.ShapeElement) : Void;
	function get(startProps:{ var rotation : Float; var x : Float; var y : Float; }, finishProps:{ var rotation : Float; var x : Float; var y : Float; }, orientToPath:Bool, t:Float) : { var rotation : Float; var x : Float; var y : Float; };
}