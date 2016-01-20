package js.three;

@:native("THREE.PointLightHelper") extern class PointLightHelper extends js.three.Object3D
{
	function new(light:js.three.Light, sphereSize:Float) : Void;
	var light : js.three.Light;
	function dispose() : Void;
	function update() : Void;
}