package js.three;

@:native("THREE.Mesh") extern class Mesh extends js.three.Object3D
{
	@:overload(function(?geometry:BufferGeometry, ?material:Material) : Void { })
	function new(?geometry:js.three.Geometry, ?material:js.three.Material) : Void;
	var geometry : haxe.extern.EitherType<js.three.Geometry, js.three.BufferGeometry>;
	var material : js.three.Material;
	function updateMorphTargets() : Void;
	function getMorphTargetIndexByName(name:String) : Float;
	override function raycast(raycaster:js.three.Raycaster, intersects:Dynamic) : Void;
	@:overload(function() : Mesh { })
	override function clone(?recursive:Bool) : js.three.Object3D;
	@:overload(function(source:Mesh) : Mesh { })
	override function copy(source:js.three.Object3D, ?recursive:Bool) : js.three.Object3D;
}