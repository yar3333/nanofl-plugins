package js.three;

@:native("THREE.Texture") extern class Texture
{
	function new(image:haxe.extern.EitherType<haxe.extern.EitherType<js.html.ImageElement, js.html.CanvasElement>, js.html.VideoElement>, ?mapping:js.three.Mapping, ?wrapS:js.three.Wrapping, ?wrapT:js.three.Wrapping, ?magFilter:js.three.TextureFilter, ?minFilter:js.three.TextureFilter, ?format:js.three.PixelFormat, ?type:js.three.TextureDataType, ?anisotropy:Int) : Void;
	var id : Int;
	var uuid : String;
	var name : String;
	var sourceFile : String;
	var image : Dynamic;
	var mipmaps : Array<js.html.ImageData>;
	var mapping : js.three.Mapping;
	var wrapS : js.three.Wrapping;
	var wrapT : js.three.Wrapping;
	var magFilter : js.three.TextureFilter;
	var minFilter : js.three.TextureFilter;
	var anisotropy : Int;
	var format : js.three.PixelFormat;
	var type : js.three.TextureDataType;
	var offset : js.three.Vector2;
	var repeat : js.three.Vector2;
	var generateMipmaps : Bool;
	var premultiplyAlpha : Bool;
	var flipY : Bool;
	var unpackAlignment : Float;
	var version : Float;
	var needsUpdate : Bool;
	var onUpdate : Void -> Void;
	function clone() : js.three.Texture;
	function copy(source:js.three.Texture) : js.three.Texture;
	function toJSON(meta:Dynamic) : Dynamic;
	function dispose() : Void;
	function transformUv(uv:js.three.Vector) : Void;
	function addEventListener(type:String, listener:Dynamic -> Void) : Void;
	function hasEventListener(type:String, listener:Dynamic -> Void) : Void;
	function removeEventListener(type:String, listener:Dynamic -> Void) : Void;
	function dispatchEvent(event:{ var target : Dynamic; var type : String; }) : Void;
	static var DEFAULT_IMAGE : Dynamic;
	static var DEFAULT_MAPPING : Dynamic;
}