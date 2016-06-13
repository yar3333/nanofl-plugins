package js.three;

@:native("THREE.ShaderPass") extern class ShaderPass
{
	function new(shader:js.three.Shader, ?textureID:String) : Void;
	var textureID : String;
	var uniforms : Dynamic;
	var material : js.three.ShaderMaterial;
	var renderToScreen : Bool;
	var enabled : Bool;
	var needsSwap : Bool;
	var clear : Bool;
	var camera : js.three.Camera;
	var scene : js.three.Scene;
	var quad : js.three.Mesh;
	function render(renderer:js.three.WebGLRenderer, writeBuffer:js.three.WebGLRenderTarget, readBuffer:js.three.WebGLRenderTarget, delta:Float) : Void;
}