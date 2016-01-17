package js.three;

@:native("THREE.ObjectLoader") extern class ObjectLoader
{
	function new(?manager:js.three.LoadingManager) : Void;
	var manager : js.three.LoadingManager;
	var texturePass : String;
	function load(url:String, ?onLoad:js.three.Object3D -> Void) : Void;
	function setTexturePath(value:String) : Void;
	function setCrossOrigin(crossOrigin:String) : Void;
	function parse<T>(json:Dynamic, ?onLoad:js.three.Object3D -> Void) : T;
	function parseGeometries(json:Dynamic) : Array<Dynamic>;
	function parseMaterials(json:Dynamic, textures:Array<js.three.Texture>) : Array<js.three.Material>;
	function parseImages(json:Dynamic, onLoad:Void -> Void) : Array<Dynamic>;
	function parseTextures(json:Dynamic, images:Dynamic) : Array<js.three.Texture>;
	function parseObject<T>(data:Dynamic, geometries:Array<Dynamic>, materials:Array<js.three.Material>) : T;
}