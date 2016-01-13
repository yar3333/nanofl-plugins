package js.three;

/**
 * 3D vector.
 *
 * @example
 * a = new THREE.Vector3( 1, 0, 0 );
 * b = new THREE.Vector3( 0, 1, 0 );
 * c = new THREE.Vector3();
 * c.crossVectors( a, b );
 *
 * @see <a href="https://github.com/mrdoob/three.js/blob/master/src/math/Vector3.js">src/math/Vector3.js</a>
 *
 * ( class Vector3 implements Vector<Vector3> )
 */
@:native("THREE.Vector3") extern class Vector3 implements js.three.Vector
{
	function new(?x:Float, ?y:Float, ?z:Float) : Void;
	var x : Float;
	var y : Float;
	var z : Float;
	/**
	 * Sets value of this vector.
	 */
	function set(x:Float, y:Float, z:Float) : js.three.Vector3;
	/**
	 * Sets x value of this vector.
	 */
	function setX(x:Float) : js.three.Vector3;
	/**
	 * Sets y value of this vector.
	 */
	function setY(y:Float) : js.three.Vector3;
	/**
	 * Sets z value of this vector.
	 */
	function setZ(z:Float) : js.three.Vector3;
	function setComponent(index:Int, value:Float) : Void;
	function getComponent(index:Int) : Float;
	/**
	 * Clones this vector.
	 */
	@:overload(function() : Vector3 { })
	function clone() : js.three.Vector;
	/**
	 * Copies value of v to this vector.
	 */
	@:overload(function(v:Vector3) : Vector3 { })
	function copy(v:js.three.Vector) : js.three.Vector;
	/**
	 * Adds v to this vector.
	 */
	@:overload(function(a:Vector3) : Vector3 { })
	function add(v:js.three.Vector) : js.three.Vector;
	function addScalar(s:Float) : js.three.Vector3;
	@:overload(function(v:Vector3, s:Float) : Vector3 { })
	function addScaledVector(v:js.three.Vector3, s:Float) : js.three.Vector3;
	/**
	 * Sets this vector to a + b.
	 */
	@:overload(function(a:Vector3, b:Vector3) : Vector3 { })
	function addVectors(a:js.three.Vector, b:js.three.Vector) : js.three.Vector;
	/**
	 * Subtracts v from this vector.
	 */
	@:overload(function(a:Vector3) : Vector3 { })
	function sub(v:js.three.Vector) : js.three.Vector;
	function subScalar(s:Float) : js.three.Vector3;
	/**
	 * Sets this vector to a - b.
	 */
	@:overload(function(a:Vector3, b:Vector3) : Vector3 { })
	function subVectors(a:js.three.Vector, b:js.three.Vector) : js.three.Vector;
	function multiply(v:js.three.Vector3) : js.three.Vector3;
	/**
	 * Multiplies this vector by scalar s.
	 */
	@:overload(function(s:Float) : Vector3 { })
	function multiplyScalar(s:Float) : js.three.Vector;
	function multiplyVectors(a:js.three.Vector3, b:js.three.Vector3) : js.three.Vector3;
	function applyEuler(euler:js.three.Euler) : js.three.Vector3;
	function applyAxisAngle(axis:js.three.Vector3, angle:Float) : js.three.Vector3;
	function applyMatrix3(m:js.three.Matrix3) : js.three.Vector3;
	function applyMatrix4(m:js.three.Matrix4) : js.three.Vector3;
	function applyProjection(m:js.three.Matrix4) : js.three.Vector3;
	function applyQuaternion(q:js.three.Quaternion) : js.three.Vector3;
	function project(camrea:js.three.Camera) : js.three.Vector3;
	function unproject(camera:js.three.Camera) : js.three.Vector3;
	function transformDirection(m:js.three.Matrix4) : js.three.Vector3;
	function divide(v:js.three.Vector3) : js.three.Vector3;
	/**
	 * Divides this vector by scalar s.
	 * Set vector to ( 0, 0, 0 ) if s == 0.
	 */
	@:overload(function(s:Float) : Vector3 { })
	function divideScalar(s:Float) : js.three.Vector;
	function min(v:js.three.Vector3) : js.three.Vector3;
	function max(v:js.three.Vector3) : js.three.Vector3;
	function clamp(min:js.three.Vector3, max:js.three.Vector3) : js.three.Vector3;
	function clampScalar(min:Float, max:Float) : js.three.Vector3;
	function clampLength(min:Float, max:Float) : js.three.Vector3;
	function floor() : js.three.Vector3;
	function ceil() : js.three.Vector3;
	function round() : js.three.Vector3;
	function roundToZero() : js.three.Vector3;
	/**
	 * Inverts this vector.
	 */
	@:overload(function() : Vector3 { })
	function negate() : js.three.Vector;
	/**
	 * Computes dot product of this vector and v.
	 */
	@:overload(function(v:Vector3) : Float { })
	function dot(v:js.three.Vector) : Float;
	/**
	 * Computes squared length of this vector.
	 */
	function lengthSq() : Float;
	/**
	 * Computes length of this vector.
	 */
	function length() : Float;
	/**
	 * Computes Manhattan length of this vector.
	 * http://en.wikipedia.org/wiki/Taxicab_geometry
	 */
	function lengthManhattan() : Float;
	/**
	 * Normalizes this vector.
	 */
	@:overload(function() : Vector3 { })
	function normalize() : js.three.Vector;
	/**
	 * Normalizes this vector and multiplies it by l.
	 */
	@:overload(function(l:Float) : Vector3 { })
	function setLength(l:Float) : js.three.Vector;
	@:overload(function(v:Vector3, alpha:Float) : Vector3 { })
	function lerp(v:js.three.Vector, alpha:Float) : js.three.Vector;
	function lerpVectors(v1:js.three.Vector3, v2:js.three.Vector3, alpha:Float) : js.three.Vector3;
	/**
	 * Sets this vector to cross product of itself and v.
	 */
	function cross(a:js.three.Vector3) : js.three.Vector3;
	/**
	 * Sets this vector to cross product of a and b.
	 */
	function crossVectors(a:js.three.Vector3, b:js.three.Vector3) : js.three.Vector3;
	function projectOnVector(v:js.three.Vector3) : js.three.Vector3;
	function projectOnPlane(planeNormal:js.three.Vector3) : js.three.Vector3;
	function reflect(vector:js.three.Vector3) : js.three.Vector3;
	function angleTo(v:js.three.Vector3) : Float;
	/**
	 * Computes distance of this vector to v.
	 */
	@:overload(function(v:Vector3) : Float { })
	function distanceTo(v:js.three.Vector) : Float;
	/**
	 * Computes squared distance of this vector to v.
	 */
	@:overload(function(v:Vector3) : Float { })
	function distanceToSquared(v:js.three.Vector) : Float;
	function setFromMatrixPosition(m:js.three.Matrix4) : js.three.Vector3;
	function setFromMatrixScale(m:js.three.Matrix4) : js.three.Vector3;
	function setFromMatrixColumn(index:Int, matrix:js.three.Matrix4) : js.three.Vector3;
	/**
	 * Checks for strict equality of this vector and v.
	 */
	@:overload(function(v:Vector3) : Bool { })
	function equals(v:js.three.Vector) : Bool;
	function fromArray(xyz:Array<Float>, ?offset:Float) : js.three.Vector3;
	function toArray(?xyz:Array<Float>, ?offset:Float) : Array<Float>;
	function fromAttribute(attribute:js.three.BufferAttribute, index:Int, ?offset:Float) : js.three.Vector3;
}