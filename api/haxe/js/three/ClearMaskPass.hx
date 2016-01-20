package js.three;

@:native("THREE.ClearMaskPass") extern class ClearMaskPass
{
	function new() : Void;
	var enabled : Bool;
	function render(renderer:js.three.WebGLRenderer, writeBuffer:js.three.WebGLRenderTarget, readBuffer:js.three.WebGLRenderTarget, delta:Float) : Void;
}