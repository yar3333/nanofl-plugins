package js.three;

@:native("THREE.MorphTarget") extern interface MorphTarget
{
	var name : String;
	var vertices : Array<js.three.Vector3>;
}