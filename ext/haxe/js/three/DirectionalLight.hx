package js.three;

/**
 * Affects objects using MeshLambertMaterial or MeshPhongMaterial.
 *
 * @example
 * // White directional light at half intensity shining from the top.
 * directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
 * directionalLight.position.set( 0, 1, 0 );
 * scene.add( directionalLight );
 *
 * @see <a href="https://github.com/mrdoob/three.js/blob/master/src/lights/DirectionalLight.js">src/lights/DirectionalLight.js</a>
 */
@:native("THREE.DirectionalLight") extern class DirectionalLight extends js.three.Light
{
	function new(?hex:Int, ?intensity:Float) : Void;
	/**
	 * Target used for shadow camera orientation.
	 */
	var target : js.three.Object3D;
	/**
	 * Light's intensity.
	 * Default — 1.0.
	 */
	var intensity : Float;
	var shadow : js.three.LightShadow;
	@:overload(function(?recursive:Bool) : DirectionalLight { })
	override function clone(?recursive:Bool) : js.three.Object3D;
	@:overload(function(source:DirectionalLight) : DirectionalLight { })
	override function copy(source:js.three.Object3D, ?recursive:Bool) : js.three.Object3D;
}