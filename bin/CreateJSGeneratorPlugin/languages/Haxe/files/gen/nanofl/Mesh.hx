package nanofl;

class Mesh extends createjs.Container
{
	static var forceSoftwareRenderer : Bool;
	
	var rotationX : Float;
	var rotationY : Float;
	var rotationZ : Float;
	
	var mesh : js.three.Mesh;
	
	var ambientLight : js.three.AmbientLight;
	var directionalLight : js.three.DirectionalLight;
	var camera : js.three.PerspectiveCamera;
	
	function new(symbol:Dynamic) : Void;
	function update() : Void;
}