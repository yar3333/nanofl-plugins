package js.three;

@:native("THREE.HemisphereLightHelper") extern class HemisphereLightHelper extends js.three.Object3D
{
	function new(light:js.three.Light, sphereSize:Float) : Void;
	var light : js.three.Light;
	var colors : Array<js.three.Color>;
	var lightSphere : js.three.Mesh;
	function dispose() : Void;
	function update() : Void;
}