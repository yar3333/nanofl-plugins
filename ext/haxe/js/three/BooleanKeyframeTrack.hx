package js.three;

@:native("THREE.BooleanKeyframeTrack") extern class BooleanKeyframeTrack extends js.three.KeyframeTrack
{
	function new(name:String, keys:Array<Dynamic>) : Void;
	var result : Dynamic;
	function setResult(value:Dynamic) : Void;
	function lerpValues(value0:Dynamic, value1:Dynamic, alpha:Float) : Dynamic;
	function compareValues(value0:Dynamic, value1:Dynamic) : Bool;
	function clone() : js.three.BooleanKeyframeTrack;
	@:overload(function(json:Dynamic) : BooleanKeyframeTrack { })
	override function parse(json:Dynamic) : js.three.KeyframeTrack;
}