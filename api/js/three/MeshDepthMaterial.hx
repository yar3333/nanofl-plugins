package js.three;

@:native("THREE.MeshDepthMaterial") extern class MeshDepthMaterial extends js.three.Material
{
	function new(?parameters:js.three.MeshDepthMaterialParameters) : Void;
	var wireframe : Bool;
	var wireframeLinewidth : Float;
	@:overload(function() : MeshDepthMaterial { })
	override function clone() : js.three.Material;
	function copy(source:js.three.MeshDepthMaterial) : js.three.MeshDepthMaterial;
}