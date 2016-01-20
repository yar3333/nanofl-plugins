package js.three;

@:native("THREE.CubicBezierCurve") extern class CubicBezierCurve extends js.three.Curve<T>
{
	function new(v0:js.three.Vector2, v1:js.three.Vector2, v2:js.three.Vector2, v3:js.three.Vector2) : Void;
	var v0 : js.three.Vector2;
	var v1 : js.three.Vector2;
	var v2 : js.three.Vector2;
	var v3 : js.three.Vector2;
}