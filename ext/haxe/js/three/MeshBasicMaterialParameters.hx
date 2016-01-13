package js.three;

/**
 * parameters is an object with one or more properties defining the material's appearance.
 */
typedef MeshBasicMaterialParameters =
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
	var color : Int;
	@:optional
	var combine : js.three.Combine;
	@:optional
	var depthTest : Bool;
	@:optional
	var depthWrite : Bool;
	@:optional
	var envMap : js.three.Texture;
	@:optional
	var fog : Bool;
	@:optional
	var map : js.three.Texture;
	@:optional
	var morphTargets : Bool;
	@:optional
	var name : String;
	@:optional
	var needsUpdate : Bool;
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
	var side : js.three.Side;
	@:optional
	var skinning : Bool;
	@:optional
	var specularMap : js.three.Texture;
	@:optional
	var transparent : Bool;
	@:optional
	var vertexColors : js.three.Colors;
	@:optional
	var visible : Bool;
	@:optional
	var wireframe : Bool;
	@:optional
	var wireframeLinewidth : Float;
};