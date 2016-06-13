package js.three;

@:native("THREE.WebGLRenderTarget") extern class WebGLRenderTarget implements js.three.RenderTarget
{
	function new(width:Float, height:Float, ?options:js.three.WebGLRenderTargetOptions) : Void;
	var uuid : String;
	var width : Float;
	var height : Float;
	var wrapS : js.three.Wrapping;
	var wrapT : js.three.Wrapping;
	var magFilter : js.three.TextureFilter;
	var minFilter : js.three.TextureFilter;
	var anisotropy : Int;
	var offset : js.three.Vector2;
	var repeat : js.three.Vector2;
	var format : Int;
	var type : Int;
	var depthBuffer : Bool;
	var stencilBuffer : Bool;
	var generateMipmaps : Bool;
	var shareDepthFrom : Dynamic;
	function setSize(width:Float, height:Float) : Void;
	function clone() : js.three.WebGLRenderTarget;
	function copy(source:js.three.WebGLRenderTarget) : js.three.WebGLRenderTarget;
	function dispose() : Void;
	function addEventListener(type:String, listener:Dynamic -> Void) : Void;
	function hasEventListener(type:String, listener:Dynamic -> Void) : Void;
	function removeEventListener(type:String, listener:Dynamic -> Void) : Void;
	function dispatchEvent(event:{ var target : Dynamic; var type : String; }) : Void;
}