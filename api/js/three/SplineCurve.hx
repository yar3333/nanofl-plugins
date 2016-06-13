package js.three;

@:native("THREE.SplineCurve") extern class SplineCurve extends js.three.Curve<T>
{
	function new(?points:Array<js.three.Vector2>) : Void;
	var points : Array<js.three.Vector2>;
}