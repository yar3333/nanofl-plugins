package js.three;

@:native("THREE.Plane") extern class Plane
{
	function new(?normal:js.three.Vector3, ?constant:Float) : Void;
	var normal : js.three.Vector3;
	var constant : Float;
	function set(normal:js.three.Vector3, constant:Float) : js.three.Plane;
	function setComponents(x:Float, y:Float, z:Float, w:Float) : js.three.Plane;
	function setFromNormalAndCoplanarPoint(normal:js.three.Vector3, point:js.three.Vector3) : js.three.Plane;
	function setFromCoplanarPoints(a:js.three.Vector3, b:js.three.Vector3, c:js.three.Vector3) : js.three.Plane;
	function clone() : js.three.Plane;
	function copy(plane:js.three.Plane) : js.three.Plane;
	function normalize() : js.three.Plane;
	function negate() : js.three.Plane;
	function distanceToPoint(point:js.three.Vector3) : Float;
	function distanceToSphere(sphere:js.three.Sphere) : Float;
	function projectPoint(point:js.three.Vector3, ?optionalTarget:js.three.Vector3) : js.three.Vector3;
	function orthoPoint(point:js.three.Vector3, ?optionalTarget:js.three.Vector3) : js.three.Vector3;
	function isIntersectionLine(line:js.three.Line3) : Bool;
	function intersectLine(line:js.three.Line3, ?optionalTarget:js.three.Vector3) : js.three.Vector3;
	function coplanarPoint(?optionalTarget:Bool) : js.three.Vector3;
	function applyMatrix4(matrix:js.three.Matrix4, ?optionalNormalMatrix:js.three.Matrix3) : js.three.Plane;
	function translate(offset:js.three.Vector3) : js.three.Plane;
	function equals(plane:js.three.Plane) : Bool;
}