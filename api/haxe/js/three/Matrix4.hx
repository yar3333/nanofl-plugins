package js.three;

/**
 * A 4x4 Matrix.
 *
 * @example
 * // Simple rig for rotating around 3 axes
 * var m = new THREE.Matrix4();
 * var m1 = new THREE.Matrix4();
 * var m2 = new THREE.Matrix4();
 * var m3 = new THREE.Matrix4();
 * var alpha = 0;
 * var beta = Math.PI;
 * var gamma = Math.PI/2;
 * m1.makeRotationX( alpha );
 * m2.makeRotationY( beta );
 * m3.makeRotationZ( gamma );
 * m.multiplyMatrices( m1, m2 );
 * m.multiply( m3 );
 */
@:native("THREE.Matrix4") extern class Matrix4 implements js.three.Matrix
{
	/**
	 * Initialises the matrix with the supplied n11..n44 values.
	 */
	function new(?n11:Float, ?n12:Float, ?n13:Float, ?n14:Float, ?n21:Float, ?n22:Float, ?n23:Float, ?n24:Float, ?n31:Float, ?n32:Float, ?n33:Float, ?n34:Float, ?n41:Float, ?n42:Float, ?n43:Float, ?n44:Float) : Void;
	/**
	 * Float32Array with matrix values.
	 */
	var elements : js.html.Float32Array;
	/**
	 * Sets all fields of this matrix.
	 */
	function set(n11:Float, n12:Float, n13:Float, n14:Float, n21:Float, n22:Float, n23:Float, n24:Float, n31:Float, n32:Float, n33:Float, n34:Float, n41:Float, n42:Float, n43:Float, n44:Float) : js.three.Matrix4;
	/**
	 * Resets this matrix to identity.
	 */
	@:overload(function() : Matrix4 { })
	function identity() : js.three.Matrix;
	@:overload(function() : Matrix4 { })
	function clone() : js.three.Matrix;
	@:overload(function(m:Matrix4) : Matrix4 { })
	function copy(m:js.three.Matrix) : js.three.Matrix;
	function copyPosition(m:js.three.Matrix4) : js.three.Matrix4;
	function extractBasis(xAxis:js.three.Vector3, yAxis:js.three.Vector3, zAxis:js.three.Vector3) : js.three.Matrix4;
	function makeBasis(xAxis:js.three.Vector3, yAxis:js.three.Vector3, zAxis:js.three.Vector3) : js.three.Matrix4;
	/**
	 * Copies the rotation component of the supplied matrix m into this matrix rotation component.
	 */
	function extractRotation(m:js.three.Matrix4) : js.three.Matrix4;
	function makeRotationFromEuler(euler:js.three.Euler) : js.three.Matrix4;
	function makeRotationFromQuaternion(q:js.three.Quaternion) : js.three.Matrix4;
	/**
	 * Constructs a rotation matrix, looking from eye towards center with defined up vector.
	 */
	function lookAt(eye:js.three.Vector3, target:js.three.Vector3, up:js.three.Vector3) : js.three.Matrix4;
	/**
	 * Multiplies this matrix by m.
	 */
	function multiply(m:js.three.Matrix4) : js.three.Matrix4;
	/**
	 * Sets this matrix to a x b.
	 */
	function multiplyMatrices(a:js.three.Matrix4, b:js.three.Matrix4) : js.three.Matrix4;
	/**
	 * Sets this matrix to a x b and stores the result into the flat array r.
	 * r can be either a regular Array or a TypedArray.
	 */
	function multiplyToArray(a:js.three.Matrix4, b:js.three.Matrix4, r:Array<Float>) : js.three.Matrix4;
	/**
	 * Multiplies this matrix by s.
	 */
	@:overload(function(s:Float) : Matrix4 { })
	function multiplyScalar(s:Float) : js.three.Matrix;
	function applyToVector3Array(array:Array<Float>, ?offset:Float, ?length:Float) : Array<Float>;
	function applyToBuffer(buffer:js.three.BufferAttribute, ?offset:Float, ?length:Float) : js.three.BufferAttribute;
	/**
	 * Computes determinant of this matrix.
	 * Based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm
	 */
	function determinant() : Float;
	/**
	 * Transposes this matrix.
	 */
	@:overload(function() : Matrix4 { })
	function transpose() : js.three.Matrix;
	/**
	 * Flattens this matrix into supplied flat array starting from offset position in the array.
	 */
	function flattenToArrayOffset(array:Array<Float>, offset:Float) : Array<Float>;
	/**
	 * Sets the position component for this matrix from vector v.
	 */
	function setPosition(v:js.three.Vector3) : js.three.Vector3;
	/**
	 * Sets this matrix to the inverse of matrix m.
	 * Based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm.
	 */
	@:overload(function(m:Matrix4, ?throwOnInvertible:Bool) : Matrix4 { })
	function getInverse(matrix:js.three.Matrix, ?throwOnInvertible:Bool) : js.three.Matrix;
	/**
	 * Multiplies the columns of this matrix by vector v.
	 */
	function scale(v:js.three.Vector3) : js.three.Matrix4;
	function getMaxScaleOnAxis() : Float;
	/**
	 * Sets this matrix as translation transform.
	 */
	function makeTranslation(x:Float, y:Float, z:Float) : js.three.Matrix4;
	/**
	 * Sets this matrix as rotation transform around x axis by theta radians.
	 *
	 * @param theta Rotation angle in radians.
	 */
	function makeRotationX(theta:Float) : js.three.Matrix4;
	/**
	 * Sets this matrix as rotation transform around y axis by theta radians.
	 *
	 * @param theta Rotation angle in radians.
	 */
	function makeRotationY(theta:Float) : js.three.Matrix4;
	/**
	 * Sets this matrix as rotation transform around z axis by theta radians.
	 *
	 * @param theta Rotation angle in radians.
	 */
	function makeRotationZ(theta:Float) : js.three.Matrix4;
	/**
	 * Sets this matrix as rotation transform around axis by angle radians.
	 * Based on http://www.gamedev.net/reference/articles/article1199.asp.
	 *
	 * @param axis Rotation axis.
	 * @param theta Rotation angle in radians.
	 */
	function makeRotationAxis(axis:js.three.Vector3, angle:Float) : js.three.Matrix4;
	/**
	 * Sets this matrix as scale transform.
	 */
	function makeScale(x:Float, y:Float, z:Float) : js.three.Matrix4;
	/**
	 * Sets this matrix to the transformation composed of translation, rotation and scale.
	 */
	function compose(translation:js.three.Vector3, rotation:js.three.Quaternion, scale:js.three.Vector3) : js.three.Matrix4;
	/**
	 * Decomposes this matrix into the translation, rotation and scale components.
	 * If parameters are not passed, new instances will be created.
	 */
	function decompose(?translation:js.three.Vector3, ?rotation:js.three.Quaternion, ?scale:js.three.Vector3) : Array<Dynamic>;
	/**
	 * Creates a frustum matrix.
	 */
	function makeFrustum(left:Float, right:Float, bottom:Float, top:Float, near:Float, far:Float) : js.three.Matrix4;
	/**
	 * Creates a perspective projection matrix.
	 */
	function makePerspective(fov:Float, aspect:Float, near:Float, far:Float) : js.three.Matrix4;
	/**
	 * Creates an orthographic projection matrix.
	 */
	function makeOrthographic(left:Float, right:Float, top:Float, bottom:Float, near:Float, far:Float) : js.three.Matrix4;
	function equals(matrix:js.three.Matrix4) : Bool;
	function fromArray(array:Array<Float>) : js.three.Matrix4;
	function toArray() : Array<Float>;
}