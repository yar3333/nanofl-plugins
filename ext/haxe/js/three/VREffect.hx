package js.three;

@:native("THREE.VREffect") extern class VREffect
{
	function new(renderer:js.three.Renderer, ?callback:String -> Void) : Void;
	function render(scene:js.three.Scene, camera:js.three.Camera) : Void;
	function setSize(width:Float, height:Float) : Void;
	function setFullScreen(flag:Bool) : Void;
	function startFullscreen() : Void;
	function FovToNDCScaleOffset(fov:js.three.VRFov) : js.three.VREffectOffset;
	function FovPortToProjection(fov:js.three.VRFov, rightHanded:Bool, zNear:Float, zFar:Float) : js.three.Matrix4;
	function FovToProjection(fov:js.three.VRFov, rightHanded:Bool, zNear:Float, zFar:Float) : js.three.Matrix4;
}