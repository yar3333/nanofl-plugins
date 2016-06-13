package js.three;

typedef MeshPhongMaterialParameters =
{
	@:optional
	var alphaMap : js.three.Texture;
	@:optional
	var alphaTest : Float;
	@:optional
	var aoMap : js.three.Texture;
	@:optional
	var aoMapIntensity : Float;
	@:optional
	var blendDst : js.three.BlendingSrcFactor;
	@:optional
	var blendEquation : js.three.BlendingEquation;
	@:optional
	var blendSrc : js.three.BlendingDstFactor;
	@:optional
	var blending : js.three.Blending;
	@:optional
	var bumpMap : js.three.Texture;
	@:optional
	var bumpScale : Float;
	/**
	 geometry color in hexadecimal. Default is 0xffffff.
	 */
	@:optional
	var color : Int;
	@:optional
	var combine : js.three.Combine;
	@:optional
	var depthTest : Bool;
	@:optional
	var depthWrite : Bool;
	@:optional
	var displacementBias : Float;
	@:optional
	var displacementMap : js.three.Texture;
	@:optional
	var displacementScale : Float;
	@:optional
	var emissive : Float;
	@:optional
	var emissiveMap : js.three.Texture;
	@:optional
	var envMap : js.three.Texture;
	@:optional
	var fog : Bool;
	@:optional
	var lightMap : js.three.Texture;
	@:optional
	var lightMapIntensity : Float;
	@:optional
	var map : js.three.Texture;
	@:optional
	var morphNormals : Bool;
	@:optional
	var morphTargets : Bool;
	@:optional
	var name : String;
	@:optional
	var needsUpdate : Bool;
	@:optional
	var normalMap : js.three.Texture;
	@:optional
	var normalScale : js.three.Vector2;
	@:optional
	var opacity : Float;
	@:optional
	var overdraw : Float;
	@:optional
	var polygonOffset : Bool;
	@:optional
	var polygonOffsetFactor : Float;
	@:optional
	var polygonOffsetUnits : Float;
	@:optional
	var reflectivity : Float;
	@:optional
	var refractionRatio : Float;
	@:optional
	var shading : js.three.Shading;
	@:optional
	var shininess : Float;
	@:optional
	var side : js.three.Side;
	@:optional
	var skinning : Bool;
	@:optional
	var specular : Float;
	@:optional
	var specularMap : js.three.Texture;
	@:optional
	var transparent : Bool;
	@:optional
	var vertexColors : js.three.Colors;
	@:optional
	var visible : Bool;
	@:optional
	var wireframe : String;
	@:optional
	var wireframeLinewidth : Float;
};