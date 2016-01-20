package js.three;

typedef ShaderMaterialParameters =
{
	@:optional
	var alphaTest : Float;
	@:optional
	var blendDst : js.three.BlendingSrcFactor;
	@:optional
	var blendEquation : js.three.BlendingEquation;
	@:optional
	var blendSrc : js.three.BlendingDstFactor;
	@:optional
	var blending : js.three.Blending;
	@:optional
	var defines : Dynamic;
	@:optional
	var depthTest : Bool;
	@:optional
	var depthWrite : Bool;
	@:optional
	var fog : Bool;
	@:optional
	var fragmentShader : String;
	@:optional
	var lights : Bool;
	@:optional
	var morphNormals : Bool;
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
	var shading : js.three.Shading;
	@:optional
	var side : js.three.Side;
	@:optional
	var skinning : Bool;
	@:optional
	var transparent : Bool;
	@:optional
	var uniforms : Dynamic;
	@:optional
	var vertexColors : js.three.Colors;
	@:optional
	var vertexShader : String;
	@:optional
	var visible : Bool;
	@:optional
	var wireframe : Bool;
	@:optional
	var wireframeLinewidth : Float;
};