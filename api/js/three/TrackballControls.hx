package js.three;

@:native("THREE.TrackballControls") extern class TrackballControls extends js.three.EventDispatcher
{
	function new(object:js.three.Camera, ?domElement:js.html.HtmlElement) : Void;
	var object : js.three.Camera;
	var domElement : js.html.HtmlElement;
	var enabled : Bool;
	var screen : { var height : Float; var left : Float; var top : Float; var width : Float; };
	var rotateSpeed : Float;
	var zoomSpeed : Float;
	var panSpeed : Float;
	var noRotate : Bool;
	var noZoom : Bool;
	var noPan : Bool;
	var noRoll : Bool;
	var staticMoving : Bool;
	var dynamicDampingFactor : Float;
	var minDistance : Float;
	var maxDistance : Float;
	var keys : Array<Float>;
	var position0 : js.three.Vector3;
	var target0 : js.three.Vector3;
	var up0 : js.three.Vector3;
	function update() : Void;
	function reset() : Void;
	function checkDistances() : Void;
	function zoomCamera() : Void;
	function panCamera() : Void;
	function rotateCamera() : Void;
	function handleResize() : Void;
	function handleEvent(event:Dynamic) : Void;
}