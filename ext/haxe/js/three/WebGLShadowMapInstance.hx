package js.three;

@:native("THREE.WebGLShadowMapInstance") extern class WebGLShadowMapInstance
{
	function new(_renderer:js.three.Renderer, _lights:Array<Dynamic>, _objects:Array<Dynamic>) : Void;
	var enabled : Bool;
	var autoUpdate : Bool;
	var needsUpdate : Bool;
	var type : js.three.ShadowMapType;
	var cullFace : js.three.CullFace;
	function render(scene:js.three.Scene) : Void;
}