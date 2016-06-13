package js.three;

@:native("THREE.AnimationAction") extern class AnimationAction
{
	function new(clip:js.three.AnimationClip, ?startTime:Float, ?timeScale:Float, ?weight:Float, ?loop:Bool) : Void;
	var clip : js.three.AnimationClip;
	var localRoot : js.three.Mesh;
	var startTime : Float;
	var timeScale : Float;
	var weight : Float;
	var loop : js.three.AnimationActionLoopStyles;
	var loopCount : Int;
	var enabled : Bool;
	var actionTime : Float;
	var clipTime : Float;
	var propertyBindings : Array<js.three.PropertyBinding>;
	function setLocalRoot(localRoot:js.three.Mesh) : js.three.AnimationAction;
	function updateTime(clipDeltaTime:Float) : Float;
	function syncWith(action:js.three.AnimationAction) : js.three.AnimationAction;
	function warpToDuration(duration:Float) : js.three.AnimationAction;
	function init(time:Float) : js.three.AnimationAction;
	function update(clipDeltaTime:Float) : Array<Dynamic>;
	function getTimeScaleAt(time:Float) : Float;
	function getWeightAt(time:Float) : Float;
}