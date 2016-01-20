package js.three;

typedef LineBasicMaterialParameters =
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
	var color : Int;
	@:optional
	var depthTest : Bool;
	@:optional
	var depthWrite : Bool;
	@:optional
	var fog : Bool;
	@:optional
	var linecap : String;
	@:optional
	var linejoin : String;
	@:optional
	var linewidth : Float;
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
	var side : js.three.Side;
	@:optional
	var transparent : Bool;
	@:optional
	var vertexColors : js.three.Colors;
	@:optional
	var visible : Bool;
};