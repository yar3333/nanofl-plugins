package js.three;

/**
 * Projects points between spaces.
 */
@:native("THREE.Projector") extern class Projector
{
	function new() : Void;
	function projectVector(vector:js.three.Vector3, camera:js.three.Camera) : js.three.Vector3;
	function unprojectVector(vector:js.three.Vector3, camera:js.three.Camera) : js.three.Vector3;
	/**
	 * Transforms a 3D scene object into 2D render data that can be rendered in a screen with your renderer of choice, projecting and clipping things out according to the used camera.
	 * If the scene were a real scene, this method would be the equivalent of taking a picture with the camera (and developing the film would be the next step, using a Renderer).
	 *
	 * @param scene scene to project.
	 * @param camera camera to use in the projection.
	 * @param sort select whether to sort elements using the Painter's algorithm.
	 */
	function projectScene(scene:js.three.Scene, camera:js.three.Camera, sortObjects:Bool, ?sortElements:Bool) : { var elements : Array<js.three.Face3>; var lights : Array<js.three.Light>; var objects : Array<js.three.Object3D>; var sprites : Array<js.three.Object3D>; };
}