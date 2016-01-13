package js.three;

@:native("THREE.ImageUtils") extern class ImageUtils
{
	static var crossOrigin : String;
	static function loadTexture(url:String, ?mapping:js.three.Mapping, ?onLoad:js.three.Texture -> Void, ?onError:String -> Void) : js.three.Texture;
	static function loadTextureCube(array:Array<String>, ?mapping:js.three.Mapping, ?onLoad:js.three.Texture -> Void, ?onError:String -> Void) : js.three.Texture;
	static function getNormalMap(image:js.html.ImageElement, ?depth:Float) : js.html.CanvasElement;
	static function generateDataTexture(width:Float, height:Float, color:js.three.Color) : js.three.DataTexture;
}