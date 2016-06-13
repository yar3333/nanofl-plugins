package js.three;

@:native("THREE.FirstPersonControls") extern class FirstPersonControls
{
	function new(object:js.three.Camera, ?domElement:js.html.HtmlElement) : Void;
	var object : js.three.Object3D;
	var target : js.three.Vector3;
	var domElement : js.html.CanvasElement;
	var movementSpeed : Float;
	var lookSpeed : Float;
	var noFly : Bool;
	var lookVertical : Bool;
	var autoForward : Bool;
	var activeLook : Bool;
	var heightSpeed : Bool;
	var heightCoef : Bool;
	var heightMin : Bool;
	var constrainVertical : Bool;
	var verticalMin : Float;
	var verticalMax : Float;
	var autoSpeedFactor : Float;
	var mouseX : Float;
	var mouseY : Float;
	var lat : Float;
	var lon : Float;
	var phi : Float;
	var theta : Float;
	var moveForward : Bool;
	var moveBackward : Bool;
	var moveLeft : Bool;
	var moveRight : Bool;
	var freeze : Bool;
	var mouseDragOn : Bool;
	function update(?delta:Float) : Void;
}