package js.three;

/**
 * This light's color gets applied to all the objects in the scene globally.
 *
 * # example
 *     light = new THREE.AmbientLight( 0x404040 ); // soft white light
 *     scene.add( light );
 *
 * @source https://github.com/mrdoob/three.js/blob/master/src/lights/AmbientLight.js
 */
@:native("THREE.AmbientLight") extern class AmbientLight extends js.three.Light
{
	/**
	 * This creates a Ambientlight with a color.
	 * @param hex Numeric value of the RGB component of the color.
	 */
	function new(?hex:Int) : Void;
	@:overload(function(?recursive:Bool) : AmbientLight { })
	override function clone(?recursive:Bool) : js.three.Object3D;
	@:overload(function(source:AmbientLight) : AmbientLight { })
	override function copy(source:js.three.Object3D, ?recursive:Bool) : js.three.Object3D;
}