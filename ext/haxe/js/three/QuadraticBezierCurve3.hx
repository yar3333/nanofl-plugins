package js.three;

@:native("THREE.QuadraticBezierCurve3") extern class QuadraticBezierCurve3 extends js.three.Curve<T>
{
	function new(v0:js.three.Vector3, v1:js.three.Vector3, v2:js.three.Vector3) : Void;
	var v0 : js.three.Vector3;
	var v1 : js.three.Vector3;
	var v2 : js.three.Vector3;
}