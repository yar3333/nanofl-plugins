package js.three;

@:native("THREE.Sprite") extern class Sprite extends js.three.Object3D
{
	function new(?material:js.three.Material) : Void;
	var geometry : js.three.BufferGeometry;
	var material : js.three.SpriteMaterial;
	override function raycast(raycaster:js.three.Raycaster, intersects:Dynamic) : Void;
	@:overload(function() : Sprite { })
	override function clone(?recursive:Bool) : js.three.Object3D;
	@:overload(function(?source:Sprite) : Sprite { })
	override function copy(source:js.three.Object3D, ?recursive:Bool) : js.three.Object3D;
}