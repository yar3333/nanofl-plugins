package js.three;

@:native("THREE.CubeCamera") extern class CubeCamera extends js.three.Object3D
{
	function new(?near:Float, ?far:Float, ?cubeResolution:Float) : Void;
	var renderTarget : js.three.WebGLRenderTargetCube;
	function updateCubeMap(renderer:js.three.Renderer, scene:js.three.Scene) : Void;
}