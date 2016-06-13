package js.three;

@:native("THREE.Line") extern class Line extends js.three.Object3D
{
	function new(?geometry:haxe.extern.EitherType<js.three.Geometry, js.three.BufferGeometry>, ?material:haxe.extern.EitherType<haxe.extern.EitherType<js.three.LineDashedMaterial, js.three.LineBasicMaterial>, js.three.ShaderMaterial>, ?mode:Float) : Void;
	var geometry : haxe.extern.EitherType<js.three.Geometry, js.three.BufferGeometry>;
	var material : js.three.Material;
	override function raycast(raycaster:js.three.Raycaster, intersects:Dynamic) : Void;
	@:overload(function() : Line { })
	override function clone(?recursive:Bool) : js.three.Object3D;
	@:overload(function(source:Line) : Line { })
	override function copy(source:js.three.Object3D, ?recursive:Bool) : js.three.Object3D;
}