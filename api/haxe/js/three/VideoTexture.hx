package js.three;

@:native("THREE.VideoTexture") extern class VideoTexture extends js.three.Texture
{
	function new(video:js.html.VideoElement, ?mapping:js.three.Mapping, ?wrapS:js.three.Wrapping, ?wrapT:js.three.Wrapping, ?magFilter:js.three.TextureFilter, ?minFilter:js.three.TextureFilter, ?format:js.three.PixelFormat, ?type:js.three.TextureDataType, ?anisotropy:Int) : Void;
}