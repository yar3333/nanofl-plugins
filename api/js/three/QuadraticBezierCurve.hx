package js.three;

@:native("THREE.QuadraticBezierCurve") extern class QuadraticBezierCurve extends js.three.Curve<T>
{
	function new(v0:js.three.Vector2, v1:js.three.Vector2, v2:js.three.Vector2) : Void;
	var v0 : js.three.Vector2;
	var v1 : js.three.Vector2;
	var v2 : js.three.Vector2;
}