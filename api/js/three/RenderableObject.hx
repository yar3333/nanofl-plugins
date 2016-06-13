package js.three;

@:native("THREE.RenderableObject") extern class RenderableObject
{
	function new() : Void;
	var id : Int;
	var object : Dynamic;
	var z : Float;
}