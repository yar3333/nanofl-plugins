package js.three;

@:native("THREE.SpotLightHelper") extern class SpotLightHelper extends js.three.Object3D
{
	function new(light:js.three.Light, sphereSize:Float, arrowLength:Float) : Void;
	var light : js.three.Light;
	var cone : js.three.Mesh;
	function dispose() : Void;
	function update() : Void;
}