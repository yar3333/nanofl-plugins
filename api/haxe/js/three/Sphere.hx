package js.three;

@:native("THREE.Sphere") extern class Sphere
{
	function new(?center:js.three.Vector3, ?radius:Float) : Void;
	var center : js.three.Vector3;
	var radius : Float;
	function set(center:js.three.Vector3, radius:Float) : js.three.Sphere;
	function setFromPoints(points:Array<js.three.Vector3>, ?optionalCenter:js.three.Vector3) : js.three.Sphere;
	function clone() : js.three.Sphere;
	function copy(sphere:js.three.Sphere) : js.three.Sphere;
	function empty() : Bool;
	function containsPoint(point:js.three.Vector3) : Bool;
	function distanceToPoint(point:js.three.Vector3) : Float;
	function intersectsSphere(sphere:js.three.Sphere) : Bool;
	function clampPoint(point:js.three.Vector3, ?optionalTarget:js.three.Vector3) : js.three.Vector3;
	function getBoundingBox(?optionalTarget:js.three.Box3) : js.three.Box3;
	function applyMatrix4(matrix:js.three.Matrix4) : js.three.Sphere;
	function translate(offset:js.three.Vector3) : js.three.Sphere;
	function equals(sphere:js.three.Sphere) : Bool;
}