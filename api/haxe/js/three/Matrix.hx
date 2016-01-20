package js.three;

/**
 * ( interface Matrix&lt;T&gt; )
 */
@:native("THREE.Matrix") extern interface Matrix
{
	/**
	 * Float32Array with matrix values.
	 */
	var elements : js.html.Float32Array;
	/**
	 * identity():T;
	 */
	function identity() : js.three.Matrix;
	/**
	 * copy(m:T):T;
	 */
	function copy(m:js.three.Matrix) : js.three.Matrix;
	/**
	 * multiplyScalar(s:Float):T;
	 */
	function multiplyScalar(s:Float) : js.three.Matrix;
	function determinant() : Float;
	/**
	 * getInverse(matrix:T, ?throwOnInvertible:Bool):T;
	 */
	function getInverse(matrix:js.three.Matrix, ?throwOnInvertible:Bool) : js.three.Matrix;
	/**
	 * transpose():T;
	 */
	function transpose() : js.three.Matrix;
	/**
	 * clone():T;
	 */
	function clone() : js.three.Matrix;
}