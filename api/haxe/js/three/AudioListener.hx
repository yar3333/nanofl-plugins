package js.three;

@:native("THREE.AudioListener") extern class AudioListener extends js.three.Object3D
{
	function new() : Void;
	var context : js.html.audio.AudioContext;
	@:overload(function(?force:Bool) : Void { })
	override function updateMatrixWorld(force:Bool) : Void;
}