package js.three;

@:native("THREE.VectorKeyframeTrack") extern class VectorKeyframeTrack
{
	function new() : Void;
	var result : Dynamic;
	function setResult(value:Dynamic) : Void;
	function lerpValues(value0:Dynamic, value1:Dynamic, alpha:Float) : Dynamic;
	function compareValues(value0:Dynamic, value1:Dynamic) : Bool;
	function clone() : js.three.VectorKeyframeTrack;
	function parse(json:Dynamic) : js.three.VectorKeyframeTrack;
}