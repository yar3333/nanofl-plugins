package js.three;

@:native("THREE.ImmediateRenderObject") extern class ImmediateRenderObject extends js.three.Object3D
{
	function new(material:js.three.Material) : Void;
	var material : js.three.Material;
	function render(renderCallback:Dynamic) : Void;
}