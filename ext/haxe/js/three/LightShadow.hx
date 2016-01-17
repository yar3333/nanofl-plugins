package js.three;

@:native("THREE.LightShadow") extern class LightShadow
{
	function new(camera:js.three.Camera) : Void;
	var camera : js.three.Camera;
	var bias : Float;
	var darkness : Float;
	var mapSize : js.three.Vector2;
	var map : js.three.RenderTarget;
	var matrix : js.three.Matrix4;
	function copy(source:js.three.LightShadow) : Void;
	function clone() : js.three.LightShadow;
}