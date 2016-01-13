package js.three;

/**
 * ( interface Vector&lt;T&gt; )
 *
 * Abstract interface of Vector2, Vector3 and Vector4.
 * Currently the members of Vector is NOT type safe because it accepts different typed vectors.
 * Those definitions will be changed when TypeScript innovates Generics to be type safe.
 *
 * @example
 * v:THREE.Vector = new THREE.Vector3();
 * v.addVectors(new THREE.Vector2(0, 1), new THREE.Vector2(2, 3));    // invalid but compiled successfully
 */
@:native("THREE.Vector") extern interface Vector
{
	function setComponent(index:Int, value:Float) : Void;
	function getComponent(index:Int) : Float;
	/**
	 * copy(v:T):T;
	 */
	function copy(v:js.three.Vector) : js.three.Vector;
	/**
	 * add(v:T):T;
	 */
	function add(v:js.three.Vector) : js.three.Vector;
	/**
	 * addVectors(a:T, b:T):T;
	 */
	function addVectors(a:js.three.Vector, b:js.three.Vector) : js.three.Vector;
	/**
	 * sub(v:T):T;
	 */
	function sub(v:js.three.Vector) : js.three.Vector;
	/**
	 * subVectors(a:T, b:T):T;
	 */
	function subVectors(a:js.three.Vector, b:js.three.Vector) : js.three.Vector;
	/**
	 * multiplyScalar(s:Float):T;
	 */
	function multiplyScalar(s:Float) : js.three.Vector;
	/**
	 * divideScalar(s:Float):T;
	 */
	function divideScalar(s:Float) : js.three.Vector;
	/**
	 * negate():T;
	 */
	function negate() : js.three.Vector;
	/**
	 * dot(v:T):T;
	 */
	function dot(v:js.three.Vector) : Float;
	/**
	 * lengthSq():Float;
	 */
	function lengthSq() : Float;
	/**
	 * length():Float;
	 */
	function length() : Float;
	/**
	 * normalize():T;
	 */
	function normalize() : js.three.Vector;
	/**
	 * NOTE: Vector4 doesn't have the property.
	 *
	 * distanceTo(v:T):Float;
	 */
	@:optional
	function distanceTo(v:js.three.Vector) : Float;
	/**
	 * NOTE: Vector4 doesn't have the property.
	 *
	 * distanceToSquared(v:T):Float;
	 */
	@:optional
	function distanceToSquared(v:js.three.Vector) : Float;
	/**
	 * setLength(l:Float):T;
	 */
	function setLength(l:Float) : js.three.Vector;
	/**
	 * lerp(v:T, alpha:Float):T;
	 */
	function lerp(v:js.three.Vector, alpha:Float) : js.three.Vector;
	/**
	 * equals(v:T):Bool;
	 */
	function equals(v:js.three.Vector) : Bool;
	/**
	 * clone():T;
	 */
	function clone() : js.three.Vector;
}