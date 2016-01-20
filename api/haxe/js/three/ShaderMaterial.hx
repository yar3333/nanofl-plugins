package js.three;

@:native("THREE.ShaderMaterial") extern class ShaderMaterial extends js.three.Material
{
	function new(?parameters:js.three.ShaderMaterialParameters) : Void;
	var defines : Dynamic;
	var uniforms : Dynamic;
	var vertexShader : String;
	var fragmentShader : String;
	var shading : js.three.Shading;
	var linewidth : Float;
	var wireframe : Bool;
	var wireframeLinewidth : Float;
	var fog : Bool;
	var lights : Bool;
	var vertexColors : js.three.Colors;
	var skinning : Bool;
	var morphTargets : Bool;
	var morphNormals : Bool;
	var derivatives : Bool;
	var defaultAttributeValues : Dynamic;
	var index0AttributeName : String;
	@:overload(function() : ShaderMaterial { })
	override function clone() : js.three.Material;
	function copy(source:js.three.ShaderMaterial) : js.three.ShaderMaterial;
	@:overload(function(meta:Dynamic) : Dynamic { })
	override function toJSON(?meta:Dynamic) : Dynamic;
}