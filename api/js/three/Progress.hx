package js.three;

@:native("THREE.Progress") extern interface Progress
{
	var total : Int;
	var loaded : Int;
}