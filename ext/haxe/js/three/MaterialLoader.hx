package js.three;

@:native("THREE.MaterialLoader") extern class MaterialLoader
{
	function new(?manager:js.three.LoadingManager) : Void;
	var manager : js.three.LoadingManager;
	var textures : Dynamic<js.three.Texture>;
	function load(url:String, onLoad:js.three.Material -> Void) : Void;
	function setCrossOrigin(crossOrigin:String) : Void;
	function setTextures(textures:Dynamic<js.three.Texture>) : Void;
	function getTexture(name:String) : js.three.Texture;
	function parse(json:Dynamic) : js.three.Material;
}