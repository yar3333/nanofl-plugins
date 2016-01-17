package js.three;

@:native("THREE.MeshPhongMaterial") extern class MeshPhongMaterial extends js.three.Material
{
	function new(?parameters:js.three.MeshPhongMaterialParameters) : Void;
	var color : js.three.Color;
	var emissive : js.three.Color;
	var specular : js.three.Color;
	var shininess : Float;
	var metal : Bool;
	var map : js.three.Texture;
	var lightMap : js.three.Texture;
	var lightMapIntensity : Float;
	var aoMap : js.three.Texture;
	var aoMapIntensity : Float;
	var emissiveMap : js.three.Texture;
	var bumpMap : js.three.Texture;
	var bumpScale : Float;
	var normalMap : js.three.Texture;
	var normalScale : js.three.Vector2;
	var displacementMap : js.three.Texture;
	var displacementScale : Float;
	var displacementBias : Float;
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
	var morphNormals : Bool;
	@:overload(function() : MeshPhongMaterial { })
	override function clone() : js.three.Material;
	function copy(source:js.three.MeshPhongMaterial) : js.three.MeshPhongMaterial;
}