package js.three;

@:native("THREE.SpritePlugin") extern class SpritePlugin implements js.three.RendererPlugin
{
	function new() : Void;
	@:overload(function(renderer:Renderer) : Void { })
	function init(renderer:js.three.WebGLRenderer) : Void;
	@:overload(function(scene:Scene, camera:Camera, viewportWidth:Float, viewportHeight:Float) : Void { })
	function render(scene:js.three.Scene, camera:js.three.Camera, currentWidth:Float, currentHeight:Float) : Void;
}