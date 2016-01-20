package js.three;

@:native("THREE.MultiMaterial") extern class MultiMaterial extends js.three.Material
{
	function new(?materials:Array<js.three.Material>) : Void;
	var materials : Array<js.three.Material>;
	@:overload(function() : Dynamic { })
	override function toJSON(?meta:Dynamic) : Dynamic;
	@:overload(function() : MultiMaterial { })
	override function clone() : js.three.Material;
}