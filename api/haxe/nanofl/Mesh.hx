package nanofl;

extern class Mesh extends nanofl.SolidContainer
{
	function new(symbol:nanofl.engine.libraryitems.MeshItem) : Void;
	var symbol(default, null) : nanofl.engine.libraryitems.MeshItem;
	var rotationX : Float;
	var rotationY : Float;
	var rotationZ : Float;
	var bitmap(default, never) : createjs.Bitmap;
	var canvas(default, never) : js.html.CanvasElement;
	var ambientLight : js.three.AmbientLight;
	var directionalLight : js.three.DirectionalLight;
	var camera : js.three.PerspectiveCamera;
	override function clone(?recursive:Bool) : nanofl.Mesh;
	override function toString() : String;
	override function draw(ctx:js.html.CanvasRenderingContext2D, ?ignoreCache:Bool) : Bool;
	function update() : Void;
	static var forceSoftwareRenderer : Bool;
}