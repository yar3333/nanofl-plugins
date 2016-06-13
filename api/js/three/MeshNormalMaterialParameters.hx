package js.three;

typedef MeshNormalMaterialParameters =
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
	var depthTest : Bool;
	@:optional
	var depthWrite : Bool;
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
	var transparent : Bool;
	@:optional
	var visible : Bool;
	/**
	 Render geometry as wireframe. Default is false (i.e. render as smooth shaded).
	 */
	@:optional
	var wireframe : Bool;
	/**
	 Controls wireframe thickness. Default is 1.
	 */
	@:optional
	var wireframeLinewidth : Float;
};