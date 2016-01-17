package js.three;

@:native("THREE.Line3") extern class Line3
{
	function new(?start:js.three.Vector3, ?end:js.three.Vector3) : Void;
	var start : js.three.Vector3;
	var end : js.three.Vector3;
	function set(?start:js.three.Vector3, ?end:js.three.Vector3) : js.three.Line3;
	function clone() : js.three.Line3;
	function copy(line:js.three.Line3) : js.three.Line3;
	function center(?optionalTarget:js.three.Vector3) : js.three.Vector3;
	function delta(?optionalTarget:js.three.Vector3) : js.three.Vector3;
	function distanceSq() : Float;
	function distance() : Float;
	function at(t:Float, ?optionalTarget:js.three.Vector3) : js.three.Vector3;
	function closestPointToPointParameter(point:js.three.Vector3, ?clampToLine:Bool) : Float;
	function closestPointToPoint(point:js.three.Vector3, ?clampToLine:Bool, ?optionalTarget:js.three.Vector3) : js.three.Vector3;
	function applyMatrix4(matrix:js.three.Matrix4) : js.three.Line3;
	function equals(line:js.three.Line3) : Bool;
}