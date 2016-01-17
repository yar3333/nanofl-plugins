package js.three;

@:native("THREE.DirectionalLightHelper") extern class DirectionalLightHelper extends js.three.Object3D
{
	function new(light:js.three.Light, ?size:Float) : Void;
	var light : js.three.Light;
	var lightPlane : js.three.Line;
	var targetLine : js.three.Line;
	function dispose() : Void;
	function update() : Void;
}