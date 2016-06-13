package js.three;

@:native("THREE.AnimationLoader") extern class AnimationLoader
{
	function new(?manager:js.three.LoadingManager) : Void;
	var manager : js.three.LoadingManager;
	function load(url:String, onLoad:Array<js.three.AnimationClip> -> Void, ?onProgress:Dynamic -> Void, ?onError:Dynamic -> Void) : Void;
	function setCrossOrigin(crossOrigin:String) : Void;
	function parse(json:Dynamic, onLoad:Array<js.three.AnimationClip> -> Void) : Void;
}