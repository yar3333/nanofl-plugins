package js.three;

@:native("THREE.LineSegments") extern class LineSegments extends js.three.Line
{
	function new(?geometry:haxe.extern.EitherType<js.three.Geometry, js.three.BufferGeometry>, ?material:haxe.extern.EitherType<haxe.extern.EitherType<js.three.LineDashedMaterial, js.three.LineBasicMaterial>, js.three.ShaderMaterial>, ?mode:Float) : Void;
	@:overload(function() : LineSegments { })
	override function clone(?recursive:Bool) : js.three.Object3D;
	@:overload(function(source:LineSegments) : LineSegments { })
	override function copy(source:js.three.Object3D, ?recursive:Bool) : js.three.Object3D;
}