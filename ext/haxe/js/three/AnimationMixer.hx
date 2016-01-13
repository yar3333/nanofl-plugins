package js.three;

@:native("THREE.AnimationMixer") extern class AnimationMixer
{
	function new(root:Dynamic) : Void;
	var root : Dynamic;
	var time : Float;
	var timeScale : Float;
	var actions : js.three.AnimationAction;
	var propertyBindingMap : Dynamic;
	function addAction(action:js.three.AnimationAction) : Void;
	function removeAllActions() : js.three.AnimationMixer;
	function removeAction(action:js.three.AnimationAction) : js.three.AnimationMixer;
	function findActionByName(name:String) : js.three.AnimationAction;
	function play(action:js.three.AnimationAction, ?optionalFadeInDuration:Float) : js.three.AnimationMixer;
	function fadeOut(action:js.three.AnimationAction, duration:Float) : js.three.AnimationMixer;
	function fadeIn(action:js.three.AnimationAction, duration:Float) : js.three.AnimationMixer;
	function warp(action:js.three.AnimationAction, startTimeScale:js.three.NumberKeyframeTrack, endTimeScale:js.three.NumberKeyframeTrack, duration:Float) : js.three.AnimationMixer;
	function crossFade(fadeOutAction:js.three.AnimationAction, fadeInAction:js.three.AnimationAction, duration:Float, warp:Bool) : js.three.AnimationMixer;
	function update(deltaTime:Float) : js.three.AnimationMixer;
}