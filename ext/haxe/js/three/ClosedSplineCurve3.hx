package js.three;

@:native("THREE.ClosedSplineCurve3") extern class ClosedSplineCurve3 extends js.three.Curve<T>
{
	function new(?points:Array<js.three.Vector3>) : Void;
	var points : Array<js.three.Vector3>;
}