package js.three;

@:native("THREE.TransformControls") extern class TransformControls extends js.three.Object3D
{
	function new(object:js.three.Camera, ?domElement:js.html.HtmlElement) : Void;
	var object : js.three.Object3D;
	function update() : Void;
	function detach() : Void;
	function attach(object:js.three.Object3D) : Void;
	function setMode(mode:String) : Void;
	function setSnap(snap:Dynamic) : Void;
	function setSize(size:Float) : Void;
	function setSpace(space:String) : Void;
}