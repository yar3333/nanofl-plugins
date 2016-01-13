package js.three;

@:native("THREE.Box2") extern class Box2
{
	function new(?min:js.three.Vector2, ?max:js.three.Vector2) : Void;
	var max : js.three.Vector2;
	var min : js.three.Vector2;
	function set(min:js.three.Vector2, max:js.three.Vector2) : js.three.Box2;
	function setFromPoints(points:Array<js.three.Vector2>) : js.three.Box2;
	function setFromCenterAndSize(center:js.three.Vector2, size:js.three.Vector2) : js.three.Box2;
	function clone() : js.three.Box2;
	function copy(box:js.three.Box2) : js.three.Box2;
	function makeEmpty() : js.three.Box2;
	function empty() : Bool;
	function center(?optionalTarget:js.three.Vector2) : js.three.Vector2;
	function size(?optionalTarget:js.three.Vector2) : js.three.Vector2;
	function expandByPoint(point:js.three.Vector2) : js.three.Box2;
	function expandByVector(vector:js.three.Vector2) : js.three.Box2;
	function expandByScalar(scalar:Float) : js.three.Box2;
	function containsPoint(point:js.three.Vector2) : Bool;
	function containsBox(box:js.three.Box2) : Bool;
	function getParameter(point:js.three.Vector2) : js.three.Vector2;
	function isIntersectionBox(box:js.three.Box2) : Bool;
	function clampPoint(point:js.three.Vector2, ?optionalTarget:js.three.Vector2) : js.three.Vector2;
	function distanceToPoint(point:js.three.Vector2) : Float;
	function intersect(box:js.three.Box2) : js.three.Box2;
	function union(box:js.three.Box2) : js.three.Box2;
	function translate(offset:js.three.Vector2) : js.three.Box2;
	function equals(box:js.three.Box2) : Bool;
}