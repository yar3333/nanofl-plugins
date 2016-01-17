package js.three;

@:native("THREE.BufferGeometryLoader") extern class BufferGeometryLoader
{
	function new(?manager:js.three.LoadingManager) : Void;
	var manager : js.three.LoadingManager;
	function load(url:String, onLoad:js.three.BufferGeometry -> Void, ?onProgress:Dynamic -> Void, ?onError:Dynamic -> Void) : Void;
	function setCrossOrigin(crossOrigin:String) : Void;
	function parse(json:Dynamic) : js.three.BufferGeometry;
}