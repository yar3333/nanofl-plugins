package js.three;

/**
 * Abstract base class for lights.
 */
@:native("THREE.Light") extern class Light extends js.three.Object3D
{
	function new(?hex:Int) : Void;
	var color : js.three.Color;
	var shadowCameraFov : Float;
	var shadowCameraLeft : Float;
	var shadowCameraRight : Float;
	var shadowCameraTop : Float;
	var shadowCameraBottom : Float;
	var shadowCameraNear : Float;
	var shadowCameraFar : Float;
	var shadowBias : Float;
	var shadowDarkness : Float;
	var shadowMapWidth : Float;
	var shadowMapHeight : Float;
	@:overload(function(?recursive:Bool) : Light { })
	override function clone(?recursive:Bool) : js.three.Object3D;
	@:overload(function(source:Light) : Light { })
	override function copy(source:js.three.Object3D, ?recursive:Bool) : js.three.Object3D;
	@:overload(function(meta:Dynamic) : Dynamic { })
	override function toJSON(?meta:Dynamic) : Dynamic;
}