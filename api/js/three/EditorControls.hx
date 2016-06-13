package js.three;

@:native("THREE.EditorControls") extern class EditorControls extends js.three.EventDispatcher
{
	function new(object:js.three.Camera, ?domElement:js.html.HtmlElement) : Void;
	var enabled : Bool;
	var center : js.three.Vector3;
	function focus(target:js.three.Object3D, frame:Bool) : Void;
	function pan(delta:js.three.Vector3) : Void;
	function zoom(delta:js.three.Vector3) : Void;
	function rotate(delta:js.three.Vector3) : Void;
	function dispose() : Void;
}