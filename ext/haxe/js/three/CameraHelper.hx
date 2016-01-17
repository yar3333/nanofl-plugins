package js.three;

@:native("THREE.CameraHelper") extern class CameraHelper extends js.three.LineSegments
{
	function new(camera:js.three.Camera) : Void;
	var camera : js.three.Camera;
	var pointMap : Dynamic<Array<Float>>;
	function update() : Void;
}