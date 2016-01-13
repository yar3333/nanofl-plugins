package js.three;

@:native("THREE.MeshNormalMaterial") extern class MeshNormalMaterial extends js.three.Material
{
	function new(?parameters:js.three.MeshNormalMaterialParameters) : Void;
	var wireframe : Bool;
	var wireframeLinewidth : Float;
	var morphTargets : Bool;
	@:overload(function() : MeshNormalMaterial { })
	override function clone() : js.three.Material;
	function copy(source:js.three.MeshNormalMaterial) : js.three.MeshNormalMaterial;
}