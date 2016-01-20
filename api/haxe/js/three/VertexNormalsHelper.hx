package js.three;

@:native("THREE.VertexNormalsHelper") extern class VertexNormalsHelper extends js.three.LineSegments
{
	function new(object:js.three.Object3D, ?size:Float, ?hex:Int, ?linewidth:Float) : Void;
	var object : js.three.Object3D;
	var size : Float;
	function update(?object:js.three.Object3D) : Void;
}