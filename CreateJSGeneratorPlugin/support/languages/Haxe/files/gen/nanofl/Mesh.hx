package nanofl;

class Mesh extends createjs.Container
{
	static var forceSoftwareRenderer : Bool;
	
	var rotationX : Float;
	var rotationY : Float;
	var rotationZ : Float;
	
	var scene : js.three.Scene;
	var group : js.three.Group;
	var camera(default, null) : js.three.PerspectiveCamera;
	var ambientLight(default, null) : js.three.AmbientLight;
	var directionalLight(default, null) : js.three.DirectionalLight;
	
	function new(symbol:Dynamic) : Void;
	function update() : Void;
}