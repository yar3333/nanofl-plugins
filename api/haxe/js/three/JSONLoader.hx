package js.three;

/**
 * A loader for loading objects in JSON format.
 */
@:native("THREE.JSONLoader") extern class JSONLoader extends js.three.Loader
{
	function new(?manager:js.three.LoadingManager) : Void;
	var manager : js.three.LoadingManager;
	var withCredentials : Bool;
	function load(url:String, ?onLoad:js.three.Geometry -> Array<js.three.Material> -> Void, ?onProgress:Dynamic -> Void, ?onError:Dynamic -> Void) : Void;
	function setCrossOrigin(crossOrigin:String) : Void;
	function setTexturePath(value:String) : Void;
	function parse(json:Dynamic, ?texturePath:String) : { var geometry : js.three.Geometry; @:optional var materials : Array<js.three.Material>; };
}