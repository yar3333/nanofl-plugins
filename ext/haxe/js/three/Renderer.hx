package js.three;

@:native("THREE.Renderer") extern interface Renderer
{
	function render(scene:js.three.Scene, camera:js.three.Camera) : Void;
	function setSize(width:Float, height:Float, ?updateStyle:Bool) : Void;
	var domElement : js.html.CanvasElement;
}