package js.three;

/**
 * This class contains the parameters that define linear fog, i.e., that grows exponentially denser with the distance.
 */
@:native("THREE.FogExp2") extern class FogExp2 implements js.three.IFog
{
	function new(hex:Int, ?density:Float) : Void;
	var name : String;
	var color : js.three.Color;
	/**
	 * Defines how fast the fog will grow dense.
	 * Default is 0.00025.
	 */
	var density : Float;
	@:overload(function() : FogExp2 { })
	function clone() : js.three.IFog;
}