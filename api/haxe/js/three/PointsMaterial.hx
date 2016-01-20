package js.three;

@:native("THREE.PointsMaterial") extern class PointsMaterial extends js.three.Material
{
	function new(?parameters:js.three.PointsMaterialParameters) : Void;
	var color : js.three.Color;
	var map : js.three.Texture;
	var size : Float;
	var sizeAttenuation : Bool;
	var vertexColors : Bool;
	var fog : Bool;
	@:overload(function() : PointsMaterial { })
	override function clone() : js.three.Material;
	function copy(source:js.three.PointsMaterial) : js.three.PointsMaterial;
}