package js.three;

/**
 * A point light that can cast shadow in one direction.
 */
@:native("THREE.SpotLight") extern class SpotLight extends js.three.Light
{
	function new(?hex:Int, ?intensity:Float, ?distance:Float, ?angle:Float, ?exponent:Float, ?decay:Float) : Void;
	/**
	 * Spotlight focus points at target.position.
	 * Default position — (0,0,0).
	 */
	var target : js.three.Object3D;
	/**
	 * Light's intensity.
	 * Default — 1.0.
	 */
	var intensity : Float;
	/**
	 * If non-zero, light will attenuate linearly from maximum intensity at light position down to zero at distance.
	 * Default — 0.0.
	 */
	var distance : Float;
	var angle : Float;
	/**
	 * Rapidity of the falloff of light from its target direction.
	 * Default — 10.0.
	 */
	var exponent : Float;
	var decay : Float;
	var shadow : js.three.LightShadow;
	@:overload(function(?recursive:Bool) : SpotLight { })
	override function clone(?recursive:Bool) : js.three.Object3D;
	@:overload(function(source:PointLight) : SpotLight { })
	override function copy(source:js.three.Object3D, ?recursive:Bool) : js.three.Object3D;
}