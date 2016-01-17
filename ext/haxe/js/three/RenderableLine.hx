package js.three;

@:native("THREE.RenderableLine") extern class RenderableLine
{
	function new() : Void;
	var id : Int;
	var v1 : js.three.RenderableVertex;
	var v2 : js.three.RenderableVertex;
	var vertexColors : Array<js.three.Color>;
	var material : js.three.Material;
	var z : Float;
}