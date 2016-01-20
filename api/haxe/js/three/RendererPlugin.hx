package js.three;

@:native("THREE.RendererPlugin") extern interface RendererPlugin
{
	function init(renderer:js.three.WebGLRenderer) : Void;
	function render(scene:js.three.Scene, camera:js.three.Camera, currentWidth:Float, currentHeight:Float) : Void;
}