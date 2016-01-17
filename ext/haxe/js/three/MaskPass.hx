package js.three;

@:native("THREE.MaskPass") extern class MaskPass
{
	function new(scene:js.three.Scene, camera:js.three.Camera) : Void;
	var scene : js.three.Scene;
	var camera : js.three.Camera;
	var enabled : Bool;
	var clear : Bool;
	var needsSwap : Bool;
	var inverse : Bool;
	function render(renderer:js.three.WebGLRenderer, writeBuffer:js.three.WebGLRenderTarget, readBuffer:js.three.WebGLRenderTarget, delta:Float) : Void;
}