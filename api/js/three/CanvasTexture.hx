package js.three;

@:native("THREE.CanvasTexture") extern class CanvasTexture extends js.three.Texture
{
	function new(canvas:haxe.extern.EitherType<haxe.extern.EitherType<js.html.ImageElement, js.html.CanvasElement>, js.html.VideoElement>, ?mapping:js.three.Mapping, ?wrapS:js.three.Wrapping, ?wrapT:js.three.Wrapping, ?magFilter:js.three.TextureFilter, ?minFilter:js.three.TextureFilter, ?format:js.three.PixelFormat, ?type:js.three.TextureDataType, ?anisotropy:Int) : Void;
}