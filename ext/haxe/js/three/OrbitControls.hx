package js.three;

@:native("THREE.OrbitControls") extern class OrbitControls
{
	function new(object:js.three.Camera, ?domElement:js.html.HtmlElement) : Void;
	var object : js.three.Camera;
	var domElement : js.html.HtmlElement;
	var enabled : Bool;
	var target : js.three.Vector3;
	/**
	 * @deprecated
	 */
	var center : js.three.Vector3;
	var noZoom : Bool;
	var zoomSpeed : Float;
	var minDistance : Float;
	var maxDistance : Float;
	var noRotate : Bool;
	var rotateSpeed : Float;
	var noPan : Bool;
	var keyPanSpeed : Float;
	var autoRotate : Bool;
	var autoRotateSpeed : Float;
	var minPolarAngle : Float;
	var maxPolarAngle : Float;
	var minAzimuthAngle : Float;
	var maxAzimuthAngle : Float;
	var noKeys : Bool;
	var keys : { var BOTTOM : Float; var LEFT : Float; var RIGHT : Float; var UP : Float; };
	var mouseButtons : { var ORBIT : js.three.MOUSE; var PAN : js.three.MOUSE; var ZOOM : js.three.MOUSE; };
	function rotateLeft(?angle:Float) : Void;
	function rotateUp(?angle:Float) : Void;
	function panLeft(?distance:Float) : Void;
	function panUp(?distance:Float) : Void;
	function pan(deltaX:Float, deltaY:Float) : Void;
	function dollyIn(dollyScale:Float) : Void;
	function dollyOut(dollyScale:Float) : Void;
	function update() : Void;
	function reset() : Void;
	function getPolarAngle() : Float;
	function getAzimuthalAngle() : Float;
	function addEventListener(type:String, listener:Dynamic -> Void) : Void;
	function hasEventListener(type:String, listener:Dynamic -> Void) : Void;
	function removeEventListener(type:String, listener:Dynamic -> Void) : Void;
	function dispatchEvent(event:{ var target : Dynamic; var type : String; }) : Void;
}