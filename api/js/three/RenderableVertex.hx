package js.three;

@:native("THREE.RenderableVertex") extern class RenderableVertex
{
	function new() : Void;
	var position : js.three.Vector3;
	var positionWorld : js.three.Vector3;
	var positionScreen : js.three.Vector4;
	var visible : Bool;
	function copy(vertex:js.three.RenderableVertex) : Void;
}