package js.three;

@:native("THREE.Box3") extern class Box3
{
	function new(?min:js.three.Vector3, ?max:js.three.Vector3) : Void;
	var max : js.three.Vector3;
	var min : js.three.Vector3;
	function set(min:js.three.Vector3, max:js.three.Vector3) : js.three.Box3;
	function setFromPoints(points:Array<js.three.Vector3>) : js.three.Box3;
	function setFromCenterAndSize(center:js.three.Vector3, size:js.three.Vector3) : js.three.Box3;
	function setFromObject(object:js.three.Object3D) : js.three.Box3;
	function clone() : js.three.Box3;
	function copy(box:js.three.Box3) : js.three.Box3;
	function makeEmpty() : js.three.Box3;
	function empty() : Bool;
	function center(?optionalTarget:js.three.Vector3) : js.three.Vector3;
	function size(?optionalTarget:js.three.Vector3) : js.three.Vector3;
	function expandByPoint(point:js.three.Vector3) : js.three.Box3;
	function expandByVector(vector:js.three.Vector3) : js.three.Box3;
	function expandByScalar(scalar:Float) : js.three.Box3;
	function containsPoint(point:js.three.Vector3) : Bool;
	function containsBox(box:js.three.Box3) : Bool;
	function getParameter(point:js.three.Vector3) : js.three.Vector3;
	function isIntersectionBox(box:js.three.Box3) : Bool;
	function clampPoint(point:js.three.Vector3, ?optionalTarget:js.three.Vector3) : js.three.Vector3;
	function distanceToPoint(point:js.three.Vector3) : Float;
	function getBoundingSphere(?optionalTarget:js.three.Sphere) : js.three.Sphere;
	function intersect(box:js.three.Box3) : js.three.Box3;
	function union(box:js.three.Box3) : js.three.Box3;
	function applyMatrix4(matrix:js.three.Matrix4) : js.three.Box3;
	function translate(offset:js.three.Vector3) : js.three.Box3;
	function equals(box:js.three.Box3) : Bool;
}