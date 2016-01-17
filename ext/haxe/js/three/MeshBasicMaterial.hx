package js.three;

@:native("THREE.MeshBasicMaterial") extern class MeshBasicMaterial extends js.three.Material
{
	function new(?parameters:js.three.MeshBasicMaterialParameters) : Void;
	var color : js.three.Color;
	var map : js.three.Texture;
	var aoMap : js.three.Texture;
	var aoMapIntensity : Float;
	var specularMap : js.three.Texture;
	var alphaMap : js.three.Texture;
	var envMap : js.three.Texture;
	var combine : js.three.Combine;
	var reflectivity : Float;
	var refractionRatio : Float;
	var fog : Bool;
	var shading : js.three.Shading;
	var wireframe : Bool;
	var wireframeLinewidth : Float;
	var wireframeLinecap : String;
	var wireframeLinejoin : String;
	var vertexColors : js.three.Colors;
	var skinning : Bool;
	var morphTargets : Bool;
	@:overload(function() : MeshBasicMaterial { })
	override function clone() : js.three.Material;
	function copy(source:js.three.MeshBasicMaterial) : js.three.MeshBasicMaterial;
}