package js.three;

@:native("THREE.WebGLRenderTargetOptions") extern interface WebGLRenderTargetOptions
{
	@:optional
	var wrapS : js.three.Wrapping;
	@:optional
	var wrapT : js.three.Wrapping;
	@:optional
	var magFilter : js.three.TextureFilter;
	@:optional
	var minFilter : js.three.TextureFilter;
	@:optional
	var anisotropy : Int;
	@:optional
	var format : Int;
	@:optional
	var type : js.three.TextureDataType;
	@:optional
	var depthBuffer : Bool;
	@:optional
	var stencilBuffer : Bool;
}