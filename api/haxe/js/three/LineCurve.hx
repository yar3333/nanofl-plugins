package js.three;

@:native("THREE.LineCurve") extern class LineCurve extends js.three.Curve<T>
{
	function new(v1:js.three.Vector2, v2:js.three.Vector2) : Void;
	var v1 : js.three.Vector2;
	var v2 : js.three.Vector2;
}