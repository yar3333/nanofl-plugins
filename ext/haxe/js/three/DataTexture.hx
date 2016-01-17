package js.three;

@:native("THREE.DataTexture") extern class DataTexture extends js.three.Texture
{
	function new(data:js.html.ImageData, width:Int, height:Int, format:js.three.PixelFormat, type:js.three.TextureDataType, mapping:js.three.Mapping, wrapS:js.three.Wrapping, wrapT:js.three.Wrapping, magFilter:js.three.TextureFilter, minFilter:js.three.TextureFilter, ?anisotropy:Int) : Void;
}