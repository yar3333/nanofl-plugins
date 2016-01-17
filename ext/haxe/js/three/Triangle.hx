package js.three;

@:native("THREE.Triangle") extern class Triangle
{
	function new(?a:js.three.Vector3, ?b:js.three.Vector3, ?c:js.three.Vector3) : Void;
	var a : js.three.Vector3;
	var b : js.three.Vector3;
	var c : js.three.Vector3;
	function set(a:js.three.Vector3, b:js.three.Vector3, c:js.three.Vector3) : js.three.Triangle;
	function setFromPointsAndIndices(points:Array<js.three.Vector3>, i0:Float, i1:Float, i2:Float) : js.three.Triangle;
	function clone() : js.three.Triangle;
	function copy(triangle:js.three.Triangle) : js.three.Triangle;
	function area() : Float;
	function midpoint(?optionalTarget:js.three.Vector3) : js.three.Vector3;
	function normal(?optionalTarget:js.three.Vector3) : js.three.Vector3;
	function plane(?optionalTarget:js.three.Vector3) : js.three.Plane;
	function barycoordFromPoint(point:js.three.Vector3, ?optionalTarget:js.three.Vector3) : js.three.Vector3;
	function containsPoint(point:js.three.Vector3) : Bool;
	function equals(triangle:js.three.Triangle) : Bool;
}