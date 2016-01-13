package js.three;

@:native("THREE.Ray") extern class Ray
{
	function new(?origin:js.three.Vector3, ?direction:js.three.Vector3) : Void;
	var origin : js.three.Vector3;
	var direction : js.three.Vector3;
	function set(origin:js.three.Vector3, direction:js.three.Vector3) : js.three.Ray;
	function clone() : js.three.Ray;
	function copy(ray:js.three.Ray) : js.three.Ray;
	function at(t:Float, ?optionalTarget:js.three.Vector3) : js.three.Vector3;
	function recast(t:Float) : js.three.Ray;
	function closestPointToPoint(point:js.three.Vector3, ?optionalTarget:js.three.Vector3) : js.three.Vector3;
	function distanceToPoint(point:js.three.Vector3) : Float;
	function distanceSqToPoint(point:js.three.Vector3) : Float;
	function distanceSqToSegment(v0:js.three.Vector3, v1:js.three.Vector3, ?optionalPointOnRay:js.three.Vector3, ?optionalPointOnSegment:js.three.Vector3) : Float;
	function isIntersectionSphere(sphere:js.three.Sphere) : Bool;
	function intersectSphere(sphere:js.three.Sphere, ?optionalTarget:js.three.Vector3) : js.three.Vector3;
	function isIntersectionPlane(plane:js.three.Plane) : Bool;
	function distanceToPlane(plane:js.three.Plane) : Float;
	function intersectPlane(plane:js.three.Plane, ?optionalTarget:js.three.Vector3) : js.three.Vector3;
	function isIntersectionBox(box:js.three.Box3) : Bool;
	function intersectBox(box:js.three.Box3, ?optionalTarget:js.three.Vector3) : js.three.Vector3;
	function intersectTriangle(a:js.three.Vector3, b:js.three.Vector3, c:js.three.Vector3, backfaceCulling:Bool, ?optionalTarget:js.three.Vector3) : js.three.Vector3;
	function applyMatrix4(matrix4:js.three.Matrix4) : js.three.Ray;
	function equals(ray:js.three.Ray) : Bool;
}