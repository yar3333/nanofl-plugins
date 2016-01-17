package js.three;

@:native("THREE.XHRLoader") extern class XHRLoader
{
	function new(?manager:js.three.LoadingManager) : Void;
	var cache : js.three.Cache;
	var manager : js.three.LoadingManager;
	var responseType : String;
	var crossOrigin : String;
	function load(url:String, ?onLoad:String -> Void, ?onProgress:Dynamic -> Void, ?onError:Dynamic -> Void) : Dynamic;
	function setResponseType(responseType:String) : Void;
	function setCrossOrigin(crossOrigin:String) : Void;
	function setWithCredentials(withCredentials:String) : Void;
}