package js.three;

@:native("THREE.VRControls") extern class VRControls
{
	function new(camera:js.three.Camera, ?callback:String -> Void) : Void;
	/**
	 * Update VR Instance Tracking
	 */
	function update() : Void;
	function zeroSensor() : Void;
	var scale : Float;
}