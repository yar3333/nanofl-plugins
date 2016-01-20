package js.three;

@:native("THREE.MeshLambertMaterial") extern class MeshLambertMaterial extends js.three.Material
{
	function new(?parameters:js.three.MeshLambertMaterialParameters) : Void;
	var color : js.three.Color;
	var emissive : js.three.Color;
	var map : js.three.Texture;
	var specularMap : js.three.Texture;
	var alphaMap : js.three.Texture;
	var envMap : js.three.Texture;
	var combine : js.three.Combine;
	var reflectivity : Float;
	var refractionRatio : Float;
	var fog : Bool;
	var wireframe : Bool;
	var wireframeLinewidth : Float;
	var wireframeLinecap : String;
	var wireframeLinejoin : String;
	var vertexColors : js.three.Colors;
	var skinning : Bool;
	var morphTargets : Bool;
	var morphNormals : Bool;
	@:overload(function() : MeshLambertMaterial { })
	override function clone() : js.three.Material;
	function copy(source:js.three.MeshLambertMaterial) : js.three.MeshLambertMaterial;
}