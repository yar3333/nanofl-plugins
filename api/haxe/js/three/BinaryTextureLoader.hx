package js.three;

@:native("THREE.BinaryTextureLoader") extern class BinaryTextureLoader
{
	function new(?manager:js.three.LoadingManager) : Void;
	var manager : js.three.LoadingManager;
	function load(url:String, onLoad:js.three.DataTexture -> Void, ?onProgress:Dynamic -> Void, ?onError:Dynamic -> Void) : Void;
	function setCrossOrigin(crossOrigin:String) : Void;
}