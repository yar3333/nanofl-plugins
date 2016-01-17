package js.three;

@:native("THREE.KeyframeTrack") extern class KeyframeTrack
{
	function new(name:String, keys:Array<Dynamic>) : Void;
	var name : String;
	var keys : Array<Dynamic>;
	var lastIndex : Int;
	function getAt(time:Float) : Dynamic;
	function shift(timeOffset:Float) : js.three.KeyframeTrack;
	function scale(timeScale:Float) : js.three.KeyframeTrack;
	function trim(startTime:Float, endTime:Float) : js.three.KeyframeTrack;
	function validate() : js.three.KeyframeTrack;
	function optimize() : js.three.KeyframeTrack;
	function keyComparator(key0:js.three.KeyframeTrack, key1:js.three.KeyframeTrack) : Float;
	function parse(json:Dynamic) : js.three.KeyframeTrack;
	function GetTrackTypeForTypeName(typeName:String) : Dynamic;
}