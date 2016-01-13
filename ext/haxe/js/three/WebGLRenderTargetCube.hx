package js.three;

@:native("THREE.WebGLRenderTargetCube") extern class WebGLRenderTargetCube extends js.three.WebGLRenderTarget
{
	function new(width:Float, height:Float, ?options:js.three.WebGLRenderTargetOptions) : Void;
	var activeCubeFace : Float;
}