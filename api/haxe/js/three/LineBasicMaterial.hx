package js.three;

@:native("THREE.LineBasicMaterial") extern class LineBasicMaterial extends js.three.Material
{
	function new(?parameters:js.three.LineBasicMaterialParameters) : Void;
	var color : js.three.Color;
	var linewidth : Float;
	var linecap : String;
	var linejoin : String;
	var vertexColors : js.three.Colors;
	var fog : Bool;
	@:overload(function() : LineBasicMaterial { })
	override function clone() : js.three.Material;
	function copy(source:js.three.LineBasicMaterial) : js.three.LineBasicMaterial;
}