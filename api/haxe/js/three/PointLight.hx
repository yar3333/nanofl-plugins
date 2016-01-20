package js.three;

/**
 * Affects objects using {@link MeshLambertMaterial} or {@link MeshPhongMaterial}.
 *
 * @example
 * var light = new THREE.PointLight( 0xff0000, 1, 100 );
 * light.position.set( 50, 50, 50 );
 * scene.add( light );
 */
@:native("THREE.PointLight") extern class PointLight extends js.three.Light
{
	function new(?hex:Int, ?intensity:Float, ?distance:Float, ?decay:Float) : Void;
	var intensity : Float;
	/**
	 * If non-zero, light will attenuate linearly from maximum intensity at light position down to zero at distance.
	 * Default — 0.0.
	 */
	var distance : Float;
	var decay : Float;
	var shadow : js.three.LightShadow;
	@:overload(function(?recursive:Bool) : PointLight { })
	override function clone(?recursive:Bool) : js.three.Object3D;
	@:overload(function(source:PointLight) : PointLight { })
	override function copy(source:js.three.Object3D, ?recursive:Bool) : js.three.Object3D;
}