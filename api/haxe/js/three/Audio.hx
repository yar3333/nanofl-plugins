package js.three;

@:native("THREE.Audio") extern class Audio extends js.three.Object3D
{
	function new(listener:js.three.AudioListener) : Void;
	var context : js.html.audio.AudioContext;
	var source : js.html.audio.AudioBufferSourceNode;
	var gain : js.html.audio.GainNode;
	var panner : js.html.audio.PannerNode;
	var autoplay : Bool;
	var startTime : Float;
	var playbackRate : Float;
	var isPlaying : Bool;
	function load(file:String) : js.three.Audio;
	function play() : Void;
	function pause() : Void;
	function stop() : Void;
	function connect() : Void;
	function disconnect() : Void;
	function setFilter(value:Dynamic) : Void;
	function getFilter() : Dynamic;
	function setPlaybackRate(value:Float) : Void;
	function getPlaybackRate() : Float;
	function setLoop(value:Bool) : Void;
	function getLoop() : Bool;
	function setRefDistance(value:Float) : Void;
	function getRefDistance() : Float;
	function setRolloffFactor(value:Float) : Void;
	function getRolloffFactor() : Float;
	function setVolume(value:Float) : Void;
	function getVolume() : Float;
	@:overload(function(?force:Bool) : Void { })
	override function updateMatrixWorld(force:Bool) : Void;
}