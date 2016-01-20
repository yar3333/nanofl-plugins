package js.three;

@:native("THREE.SplineCurve3") extern class SplineCurve3 extends js.three.Curve<T>
{
	function new(?points:Array<js.three.Vector3>) : Void;
	var points : Array<js.three.Vector3>;
}