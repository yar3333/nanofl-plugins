package js.three;

@:native("THREE.CubeTextureLoader") extern class CubeTextureLoader
{
	function new(?manager:js.three.LoadingManager) : Void;
	var manager : js.three.LoadingManager;
	function load(urls:Array<String>, ?onLoad:js.three.CubeTexture -> Void, ?onProgress:Dynamic -> Void, ?onError:Dynamic -> Void) : Void;
	function setCrossOrigin(crossOrigin:String) : Void;
}