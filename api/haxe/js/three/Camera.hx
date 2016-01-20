package js.three;

/**
 * Abstract base class for cameras. This class should always be inherited when you build a new camera.
 */
@:native("THREE.Camera") extern class Camera extends js.three.Object3D
{
	/**
	 * This constructor sets following properties to the correct type: matrixWorldInverse, projectionMatrix and projectionMatrixInverse.
	 */
	function new() : Void;
	/**
	 * This is the inverse of matrixWorld. MatrixWorld contains the Matrix which has the world transform of the Camera.
	 */
	var matrixWorldInverse : js.three.Matrix4;
	/**
	 * This is the matrix which contains the projection.
	 */
	var projectionMatrix : js.three.Matrix4;
	override function getWorldDirection(?optionalTarget:js.three.Vector3) : js.three.Vector3;
	/**
	 * This make the camera look at the vector position in local space.
	 * @param vector point to look at
	 */
	override function lookAt(vector:js.three.Vector3) : Void;
	@:overload(function() : Camera { })
	override function clone(?recursive:Bool) : js.three.Object3D;
	@:overload(function(?camera:Camera) : Camera { })
	override function copy(source:js.three.Object3D, ?recursive:Bool) : js.three.Object3D;
}