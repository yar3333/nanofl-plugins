package js.three;

/**
 * 2D vector.
 *
 * ( class Vector2 implements Vector<Vector2> )
 */
@:native("THREE.Vector2") extern class Vector2 implements js.three.Vector
{
	function new(?x:Float, ?y:Float) : Void;
	var x : Float;
	var y : Float;
	var width : Float;
	var height : Float;
	/**
	 * Sets value of this vector.
	 */
	function set(x:Float, y:Float) : js.three.Vector2;
	/**
	 * Sets X component of this vector.
	 */
	function setX(x:Float) : js.three.Vector2;
	/**
	 * Sets Y component of this vector.
	 */
	function setY(y:Float) : js.three.Vector2;
	/**
	 * Sets a component of this vector.
	 */
	function setComponent(index:Int, value:Float) : Void;
	/**
	 * Gets a component of this vector.
	 */
	function getComponent(index:Int) : Float;
	/**
	 * Clones this vector.
	 */
	@:overload(function() : Vector2 { })
	function clone() : js.three.Vector;
	/**
	 * Copies value of v to this vector.
	 */
	@:overload(function(v:Vector2) : Vector2 { })
	function copy(v:js.three.Vector) : js.three.Vector;
	/**
	 * Adds v to this vector.
	 */
	@:overload(function(v:Vector2) : Vector2 { })
	function add(v:js.three.Vector) : js.three.Vector;
	/**
	 * Sets this vector to a + b.
	 */
	function addScalar(s:Float) : js.three.Vector2;
	@:overload(function(a:Vector2, b:Vector2) : Vector2 { })
	function addVectors(a:js.three.Vector, b:js.three.Vector) : js.three.Vector;
	function addScaledVector(v:js.three.Vector2, s:Float) : js.three.Vector2;
	/**
	 * Subtracts v from this vector.
	 */
	@:overload(function(v:Vector2) : Vector2 { })
	function sub(v:js.three.Vector) : js.three.Vector;
	/**
	 * Sets this vector to a - b.
	 */
	@:overload(function(a:Vector2, b:Vector2) : Vector2 { })
	function subVectors(a:js.three.Vector, b:js.three.Vector) : js.three.Vector;
	function multiply(v:js.three.Vector2) : js.three.Vector2;
	/**
	 * Multiplies this vector by scalar s.
	 */
	@:overload(function(scalar:Float) : Vector2 { })
	function multiplyScalar(s:Float) : js.three.Vector;
	function divide(v:js.three.Vector2) : js.three.Vector2;
	/**
	 * Divides this vector by scalar s.
	 * Set vector to ( 0, 0 ) if s == 0.
	 */
	@:overload(function(s:Float) : Vector2 { })
	function divideScalar(s:Float) : js.three.Vector;
	function min(v:js.three.Vector2) : js.three.Vector2;
	function max(v:js.three.Vector2) : js.three.Vector2;
	function clamp(min:js.three.Vector2, max:js.three.Vector2) : js.three.Vector2;
	function clampScalar(min:Float, max:Float) : js.three.Vector2;
	function clampLength(min:Float, max:Float) : js.three.Vector2;
	function floor() : js.three.Vector2;
	function ceil() : js.three.Vector2;
	function round() : js.three.Vector2;
	function roundToZero() : js.three.Vector2;
	/**
	 * Inverts this vector.
	 */
	@:overload(function() : Vector2 { })
	function negate() : js.three.Vector;
	/**
	 * Computes dot product of this vector and v.
	 */
	@:overload(function(v:Vector2) : Float { })
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
	@:overload(function() : Vector2 { })
	function normalize() : js.three.Vector;
	/**
	 * Computes distance of this vector to v.
	 */
	@:overload(function(v:Vector2) : Float { })
	function distanceTo(v:js.three.Vector) : Float;
	/**
	 * Computes squared distance of this vector to v.
	 */
	@:overload(function(v:Vector2) : Float { })
	function distanceToSquared(v:js.three.Vector) : Float;
	/**
	 * Normalizes this vector and multiplies it by l.
	 */
	@:overload(function(length:Float) : Vector2 { })
	function setLength(l:Float) : js.three.Vector;
	@:overload(function(v:Vector2, alpha:Float) : Vector2 { })
	function lerp(v:js.three.Vector, alpha:Float) : js.three.Vector;
	function lerpVectors(v1:js.three.Vector2, v2:js.three.Vector2, alpha:Float) : js.three.Vector2;
	/**
	 * Checks for strict equality of this vector and v.
	 */
	@:overload(function(v:Vector2) : Bool { })
	function equals(v:js.three.Vector) : Bool;
	function fromArray(xy:Array<Float>, ?offset:Float) : js.three.Vector2;
	function toArray(?xy:Array<Float>, ?offset:Float) : Array<Float>;
	function fromAttribute(attribute:js.three.BufferAttribute, index:Int, ?offset:Float) : js.three.Vector2;
	function rotateAround(center:js.three.Vector2, angle:Float) : js.three.Vector2;
}