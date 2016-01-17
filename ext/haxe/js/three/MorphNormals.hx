package js.three;

@:native("THREE.MorphNormals") extern interface MorphNormals
{
	var name : String;
	var normals : Array<js.three.Vector3>;
}