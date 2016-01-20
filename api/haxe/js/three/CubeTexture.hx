package js.three;

@:native("THREE.CubeTexture") extern class CubeTexture extends js.three.Texture
{
	function new(images:Array<Dynamic>, ?mapping:js.three.Mapping, ?wrapS:js.three.Wrapping, ?wrapT:js.three.Wrapping, ?magFilter:js.three.TextureFilter, ?minFilter:js.three.TextureFilter, ?format:js.three.PixelFormat, ?type:js.three.TextureDataType, ?anisotropy:Int) : Void;
	var images : Array<Dynamic>;
	@:overload(function(source:CubeTexture) : CubeTexture { })
	override function copy(source:js.three.Texture) : js.three.Texture;
}