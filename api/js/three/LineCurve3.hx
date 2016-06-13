package js.three;

@:native("THREE.LineCurve3") extern class LineCurve3 extends js.three.Curve<T>
{
	function new(v1:js.three.Vector3, v2:js.three.Vector3) : Void;
	var v1 : js.three.Vector3;
	var v2 : js.three.Vector3;
}