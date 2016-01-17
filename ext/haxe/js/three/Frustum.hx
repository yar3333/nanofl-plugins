package js.three;

/**
 * Frustums are used to determine what is inside the camera's field of view. They help speed up the rendering process.
 */
@:native("THREE.Frustum") extern class Frustum
{
	function new(?p0:js.three.Plane, ?p1:js.three.Plane, ?p2:js.three.Plane, ?p3:js.three.Plane, ?p4:js.three.Plane, ?p5:js.three.Plane) : Void;
	/**
	 * Array of 6 vectors.
	 */
	var planes : Array<js.three.Plane>;
	function set(?p0:Float, ?p1:Float, ?p2:Float, ?p3:Float, ?p4:Float, ?p5:Float) : js.three.Frustum;
	function clone() : js.three.Frustum;
	function copy(frustum:js.three.Frustum) : js.three.Frustum;
	function setFromMatrix(m:js.three.Matrix4) : js.three.Frustum;
	function intersectsObject(object:js.three.Object3D) : Bool;
	function intersectsSphere(sphere:js.three.Sphere) : Bool;
	function intersectsBox(box:js.three.Box3) : Bool;
	function containsPoint(point:js.three.Vector3) : Bool;
}