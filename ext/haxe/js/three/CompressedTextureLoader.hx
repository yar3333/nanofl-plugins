package js.three;

@:native("THREE.CompressedTextureLoader") extern class CompressedTextureLoader
{
	function new(?manager:js.three.LoadingManager) : Void;
	var manager : js.three.LoadingManager;
	function load(url:String, onLoad:js.three.CompressedTexture -> Void, ?onProgress:Dynamic -> Void, ?onError:Dynamic -> Void) : Void;
	function setCrossOrigin(crossOrigin:String) : Void;
}