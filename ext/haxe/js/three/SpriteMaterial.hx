package js.three;

@:native("THREE.SpriteMaterial") extern class SpriteMaterial extends js.three.Material
{
	function new(?parameters:js.three.SpriteMaterialParameters) : Void;
	var color : js.three.Color;
	var map : js.three.Texture;
	var rotation : Float;
	var fog : Bool;
	@:overload(function() : SpriteMaterial { })
	override function clone() : js.three.Material;
	function copy(source:js.three.SpriteMaterial) : js.three.SpriteMaterial;
}