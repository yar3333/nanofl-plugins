package js.three;

/**
 * Camera with orthographic projection
 *
 * @example
 * camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 1000 );
 * scene.add( camera );
 *
 * @see <a href="https://github.com/mrdoob/three.js/blob/master/src/cameras/OrthographicCamera.js">src/cameras/OrthographicCamera.js</a>
 */
@:native("THREE.OrthographicCamera") extern class OrthographicCamera extends js.three.Camera
{
	/**
	 * @param left Camera frustum left plane.
	 * @param right Camera frustum right plane.
	 * @param top Camera frustum top plane.
	 * @param bottom Camera frustum bottom plane.
	 * @param near Camera frustum near plane.
	 * @param far Camera frustum far plane.
	 */
	function new(left:Float, right:Float, top:Float, bottom:Float, ?near:Float, ?far:Float) : Void;
	var zoom : Float;
	/**
	 * Camera frustum left plane.
	 */
	var left : Float;
	/**
	 * Camera frustum right plane.
	 */
	var right : Float;
	/**
	 * Camera frustum top plane.
	 */
	var top : Float;
	/**
	 * Camera frustum bottom plane.
	 */
	var bottom : Float;
	/**
	 * Camera frustum near plane.
	 */
	var near : Float;
	/**
	 * Camera frustum far plane.
	 */
	var far : Float;
	/**
	 * Updates the camera projection matrix. Must be called after change of parameters.
	 */
	function updateProjectionMatrix() : Void;
	@:overload(function() : OrthographicCamera { })
	override function clone(?recursive:Bool) : js.three.Object3D;
	@:overload(function(source:OrthographicCamera) : OrthographicCamera { })
	override function copy(source:js.three.Object3D, ?recursive:Bool) : js.three.Object3D;
	override function toJSON(?meta:Dynamic) : Dynamic;
}