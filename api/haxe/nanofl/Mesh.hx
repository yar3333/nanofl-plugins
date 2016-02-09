package nanofl;

extern class Mesh extends nanofl.SolidContainer
{
	function new(symbol:nanofl.engine.libraryitems.MeshItem) : Void;
	var symbol(default, null) : nanofl.engine.libraryitems.MeshItem;
	var rotationX : Float;
	var rotationY : Float;
	var rotationZ : Float;
	var scene : js.three.Scene;
	var group : js.three.Group;
	var camera(default, null) : js.three.PerspectiveCamera;
	var ambientLight(default, null) : js.three.AmbientLight;
	var directionalLight(default, null) : js.three.DirectionalLight;
	override function clone(?recursive:Bool) : nanofl.Mesh;
	override function toString() : String;
	override function draw(ctx:js.html.CanvasRenderingContext2D, ?ignoreCache:Bool) : Bool;
	function update() : Void;
	static var forceSoftwareRenderer : Bool;
}