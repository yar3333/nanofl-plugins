package js.three;

@:native("THREE.LineDashedMaterial") extern class LineDashedMaterial extends js.three.Material
{
	function new(?parameters:js.three.LineDashedMaterialParameters) : Void;
	var color : js.three.Color;
	var linewidth : Float;
	var scale : Float;
	var dashSize : Float;
	var gapSize : Float;
	var vertexColors : js.three.Colors;
	var fog : Bool;
	@:overload(function() : LineDashedMaterial { })
	override function clone() : js.three.Material;
	function copy(source:js.three.LineDashedMaterial) : js.three.LineDashedMaterial;
}