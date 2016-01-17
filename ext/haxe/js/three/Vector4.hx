package js.three;

/**
 * 4D vector.
 *
 * ( class Vector4 implements Vector<Vector4> )
 */
@:native("THREE.Vector4") extern class Vector4 implements js.three.Vector
{
	function new(?x:Float, ?y:Float, ?z:Float, ?w:Float) : Void;
	var x : Float;
	var y : Float;
	var z : Float;
	var w : Float;
	/**
	 * Sets value of this vector.
	 */
	function set(x:Float, y:Float, z:Float, w:Float) : js.three.Vector4;
	/**
	 * Sets X component of this vector.
	 */
	function setX(x:Float) : js.three.Vector4;
	/**
	 * Sets Y component of this vector.
	 */
	function setY(y:Float) : js.three.Vector4;
	/**
	 * Sets Z component of this vector.
	 */
	function setZ(z:Float) : js.three.Vector4;
	/**
	 * Sets w component of this vector.
	 */
	function setW(w:Float) : js.three.Vector4;
	function setComponent(index:Int, value:Float) : Void;
	function getComponent(index:Int) : Float;
	/**
	 * Clones this vector.
	 */
	@:overload(function() : Vector4 { })
	function clone() : js.three.Vector;
	/**
	 * Copies value of v to this vector.
	 */
	@:overload(function(v:Vector4) : Vector4 { })
	function copy(v:js.three.Vector) : js.three.Vector;
	/**
	 * Adds v to this vector.
	 */
	@:overload(function(v:Vector4) : Vector4 { })
	function add(v:js.three.Vector) : js.three.Vector;
	function addScalar(s:Float) : js.three.Vector4;
	/**
	 * Sets this vector to a + b.
	 */
	@:overload(function(a:Vector4, b:Vector4) : Vector4 { })
	function addVectors(a:js.three.Vector, b:js.three.Vector) : js.three.Vector;
	function addScaledVector(v:js.three.Vector4, s:Float) : js.three.Vector4;
	/**
	 * Subtracts v from this vector.
	 */
	@:overload(function(v:Vector4) : Vector4 { })
	function sub(v:js.three.Vector) : js.three.Vector;
	function subScalar(s:Float) : js.three.Vector4;
	/**
	 * Sets this vector to a - b.
	 */
	@:overload(function(a:Vector4, b:Vector4) : Vector4 { })
	function subVectors(a:js.three.Vector, b:js.three.Vector) : js.three.Vector;
	/**
	 * Multiplies this vector by scalar s.
	 */
	@:overload(function(s:Float) : Vector4 { })
	function multiplyScalar(s:Float) : js.three.Vector;
	function applyMatrix4(m:js.three.Matrix4) : js.three.Vector4;
	/**
	 * Divides this vector by scalar s.
	 * Set vector to ( 0, 0, 0 ) if s == 0.
	 */
	@:overload(function(s:Float) : Vector4 { })
	function divideScalar(s:Float) : js.three.Vector;
	/**
	 * http://www.euclideanspace.com/maths/geometry/rotations/conversions/quaternionToAngle/index.htm
	 * @param q is assumed to be normalized
	 */
	function setAxisAngleFromQuaternion(q:js.three.Quaternion) : js.three.Vector4;
	/**
	 * http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToAngle/index.htm
	 * @param m assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)
	 */
	function setAxisAngleFromRotationMatrix(m:js.three.Matrix3) : js.three.Vector4;
	function min(v:js.three.Vector4) : js.three.Vector4;
	function max(v:js.three.Vector4) : js.three.Vector4;
	function clamp(min:js.three.Vector4, max:js.three.Vector4) : js.three.Vector4;
	function clampScalar(min:Float, max:Float) : js.three.Vector4;
	function floor() : js.three.Vector4;
	function ceil() : js.three.Vector4;
	function round() : js.three.Vector4;
	function roundToZero() : js.three.Vector4;
	/**
	 * Inverts this vector.
	 */
	@:overload(function() : Vector4 { })
	function negate() : js.three.Vector;
	/**
	 * Computes dot product of this vector and v.
	 */
	@:overload(function(v:Vector4) : Float { })
	function dot(v:js.three.Vector) : Float;
	/**
	 * Computes squared length of this vector.
	 */
	function lengthSq() : Float;
	/**
	 * Computes length of this vector.
	 */
	function length() : Float;
	function lengthManhattan() : Float;
	/**
	 * Normalizes this vector.
	 */
	@:overload(function() : Vector4 { })
	function normalize() : js.three.Vector;
	/**
	 * Normalizes this vector and multiplies it by l.
	 */
	@:overload(function(length:Float) : Vector4 { })
	function setLength(l:Float) : js.three.Vector;
	/**
	 * Linearly interpolate between this vector and v with alpha factor.
	 */
	@:overload(function(v:Vector4, alpha:Float) : Vector4 { })
	function lerp(v:js.three.Vector, alpha:Float) : js.three.Vector;
	function lerpVectors(v1:js.three.Vector4, v2:js.three.Vector4, alpha:Float) : js.three.Vector4;
	/**
	 * Checks for strict equality of this vector and v.
	 */
	@:overload(function(v:Vector4) : Bool { })
	function equals(v:js.three.Vector) : Bool;
	function fromArray(xyzw:Array<Float>, ?offset:Float) : js.three.Vector4;
	function toArray(?xyzw:Array<Float>, ?offset:Float) : Array<Float>;
	function fromAttribute(attribute:js.three.BufferAttribute, index:Int, ?offset:Float) : js.three.Vector4;
	/**
	 * Unsupported.
	 */
	function distanceTo(v:js.three.Vector) : Float;
	/**
	 * Unsupported.
	 */
	function distanceToSquared(v:js.three.Vector) : Float;
}