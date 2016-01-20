package js.three;

@:native("THREE.RenderableFace") extern class RenderableFace
{
	function new() : Void;
	var id : Int;
	var v1 : js.three.RenderableVertex;
	var v2 : js.three.RenderableVertex;
	var v3 : js.three.RenderableVertex;
	var normalModel : js.three.Vector3;
	var vertexNormalsModel : Array<js.three.Vector3>;
	var vertexNormalsLength : Float;
	var color : js.three.Color;
	var material : js.three.Material;
	var uvs : Array<Array<js.three.Vector2>>;
	var z : Float;
}