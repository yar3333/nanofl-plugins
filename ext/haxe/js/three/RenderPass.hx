package js.three;

@:native("THREE.RenderPass") extern class RenderPass
{
	@:overload(function(scene:Scene, camera:Camera, ?overrideMaterial:Material, ?clearColor:String, ?clearAlpha:Float) : Void { })
	@:overload(function(scene:Scene, camera:Camera, ?overrideMaterial:Material, ?clearColor:Float, ?clearAlpha:Float) : Void { })
	function new(scene:js.three.Scene, camera:js.three.Camera, ?overrideMaterial:js.three.Material, ?clearColor:js.three.Color, ?clearAlpha:Float) : Void;
	var scene : js.three.Scene;
	var camera : js.three.Camera;
	var overrideMaterial : js.three.Material;
	var clearColor : Dynamic;
	var clearAlpha : Float;
	var oldClearColor : js.three.Color;
	var oldClearAlpha : Float;
	var enabled : Bool;
	var clear : Bool;
	var needsSwap : Bool;
	function render(renderer:js.three.WebGLRenderer, writeBuffer:js.three.WebGLRenderTarget, readBuffer:js.three.WebGLRenderTarget, delta:Float) : Void;
}