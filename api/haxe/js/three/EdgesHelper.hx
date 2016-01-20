package js.three;

@:native("THREE.EdgesHelper") extern class EdgesHelper extends js.three.LineSegments
{
	function new(object:js.three.Object3D, ?hex:Int, ?thresholdAngle:Float) : Void;
}