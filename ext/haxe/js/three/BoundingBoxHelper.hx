package js.three;

@:native("THREE.BoundingBoxHelper") extern class BoundingBoxHelper extends js.three.Mesh
{
	function new(?object:js.three.Object3D, ?hex:Int) : Void;
	var object : js.three.Object3D;
	var box : js.three.Box3;
	function update() : Void;
}