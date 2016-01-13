package js.three;

/**
 * Implementation of a quaternion. This is used for rotating things without incurring in the dreaded gimbal lock issue, amongst other advantages.
 *
 * @example
 * var quaternion = new THREE.Quaternion();
 * quaternion.setFromAxisAngle( new THREE.Vector3( 0, 1, 0 ), Math.PI / 2 );
 * var vector = new THREE.Vector3( 1, 0, 0 );
 * vector.applyQuaternion( quaternion );
 */
@:native("THREE.Quaternion") extern class Quaternion
{
	/**
	 * @param x x coordinate
	 * @param y y coordinate
	 * @param z z coordinate
	 * @param w w coordinate
	 */
	function new(?x:Float, ?y:Float, ?z:Float, ?w:Float) : Void;
	var x : Float;
	var y : Float;
	var z : Float;
	var w : Float;
	/**
	 * Sets values of this quaternion.
	 */
	function set(x:Float, y:Float, z:Float, w:Float) : js.three.Quaternion;
	/**
	 * Clones this quaternion.
	 */
	function clone() : js.three.Quaternion;
	/**
	 * Copies values of q to this quaternion.
	 */
	function copy(q:js.three.Quaternion) : js.three.Quaternion;
	/**
	 * Sets this quaternion from rotation specified by Euler angles.
	 */
	function setFromEuler(euler:js.three.Euler, ?update:Bool) : js.three.Quaternion;
	/**
	 * Sets this quaternion from rotation specified by axis and angle.
	 * Adapted from http://www.euclideanspace.com/maths/geometry/rotations/conversions/angleToQuaternion/index.htm.
	 * Axis have to be normalized, angle is in radians.
	 */
	function setFromAxisAngle(axis:js.three.Vector3, angle:Float) : js.three.Quaternion;
	/**
	 * Sets this quaternion from rotation component of m. Adapted from http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm.
	 */
	function setFromRotationMatrix(m:js.three.Matrix4) : js.three.Quaternion;
	function setFromUnitVectors(vFrom:js.three.Vector3, vTo:js.three.Vector3) : js.three.Quaternion;
	/**
	 * Inverts this quaternion.
	 */
	function inverse() : js.three.Quaternion;
	function conjugate() : js.three.Quaternion;
	function dot(v:js.three.Vector3) : Float;
	function lengthSq() : Float;
	/**
	 * Computes length of this quaternion.
	 */
	function length() : Float;
	/**
	 * Normalizes this quaternion.
	 */
	function normalize() : js.three.Quaternion;
	/**
	 * Multiplies this quaternion by b.
	 */
	function multiply(q:js.three.Quaternion) : js.three.Quaternion;
	/**
	 * Sets this quaternion to a x b
	 * Adapted from http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/code/index.htm.
	 */
	function multiplyQuaternions(a:js.three.Quaternion, b:js.three.Quaternion) : js.three.Quaternion;
	/**
	 * Deprecated. Use Vector3.applyQuaternion instead
	 */
	function multiplyVector3(vector:js.three.Vector3) : js.three.Vector3;
	function slerp(qb:js.three.Quaternion, t:Float) : js.three.Quaternion;
	function equals(v:js.three.Quaternion) : Bool;
	@:overload(function(xyzw:Array<Float>, ?offset:Float) : Quaternion { })
	function fromArray(n:Array<Int>) : js.three.Quaternion;
	function toArray(?xyzw:Array<Float>, ?offset:Float) : Array<Float>;
	var onChange : Void -> Void;
}