package js.three;

@:native("THREE.Intersection") extern interface Intersection
{
	var distance : Float;
	var point : js.three.Vector3;
	var face : js.three.Face3;
	var object : js.three.Object3D;
}