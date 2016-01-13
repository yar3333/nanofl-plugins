package js.three;

@:native("THREE.StringKeyframeTrack") extern class StringKeyframeTrack
{
	function new() : Void;
	var result : Dynamic;
	function setResult(value:Dynamic) : Void;
	function lerpValues(value0:Dynamic, value1:Dynamic, alpha:Float) : Dynamic;
	function compareValues(value0:Dynamic, value1:Dynamic) : Bool;
	function clone() : js.three.StringKeyframeTrack;
	function parse(json:Dynamic) : js.three.StringKeyframeTrack;
}