package js.three;

@:native("THREE.AnimationClip") extern class AnimationClip
{
	function new(name:String, ?duration:Float, ?tracks:Array<js.three.KeyframeTrack>) : Void;
	var name : String;
	var tracks : Array<js.three.KeyframeTrack>;
	var duration : Float;
	var results : Array<Dynamic>;
	function getAt(clipTime:Float) : Array<Dynamic>;
	function trim() : js.three.AnimationClip;
	function optimize() : js.three.AnimationClip;
	function findByName(clipArray:js.three.AnimationClip, name:String) : js.three.AnimationClip;
	function parse(json:Dynamic) : js.three.AnimationClip;
	function parseAnimation(animation:Dynamic, bones:Array<js.three.Bone>, nodeName:String) : js.three.AnimationClip;
	static function CreateFromMorphTargetSequence(name:String, morphTargetSequence:Array<js.three.MorphTarget>, fps:Float) : js.three.AnimationClip;
	static function CreateClipsFromMorphTargetSequences(morphTargets:Array<js.three.MorphTarget>, fps:Float) : Array<js.three.AnimationClip>;
}