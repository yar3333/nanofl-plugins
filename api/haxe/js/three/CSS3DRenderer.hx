package js.three;

@:native("THREE.CSS3DRenderer") extern class CSS3DRenderer
{
	function new() : Void;
	var domElement : js.html.HtmlElement;
	function setSize(width:Float, height:Float) : Void;
	function render(scene:js.three.Scene, camera:js.three.Camera) : Void;
}