package js.three;

@:native("THREE.EffectComposer") extern class EffectComposer
{
	function new(renderer:js.three.WebGLRenderer, ?renderTarget:js.three.WebGLRenderTarget) : Void;
	var renderTarget1 : js.three.WebGLRenderTarget;
	var renderTarget2 : js.three.WebGLRenderTarget;
	var writeBuffer : js.three.WebGLRenderTarget;
	var readBuffer : js.three.WebGLRenderTarget;
	var passes : Array<Dynamic>;
	var copyPass : js.three.ShaderPass;
	function swapBuffers() : Void;
	function addPass(pass:Dynamic) : Void;
	function insertPass(pass:Dynamic, index:Int) : Void;
	function render(?delta:Float) : Void;
	function reset(?renderTarget:js.three.WebGLRenderTarget) : Void;
	function setSize(width:Float, height:Float) : Void;
}