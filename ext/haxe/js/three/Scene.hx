package js.three;

/**
 * Scenes allow you to set up what and where is to be rendered by three.js. This is where you place objects, lights and cameras.
 */
@:native("THREE.Scene") extern class Scene extends js.three.Object3D
{
	function new() : Void;
	/**
	 * A fog instance defining the type of fog that affects everything rendered in the scene. Default is null.
	 */
	var fog : js.three.IFog;
	/**
	 * If not null, it will force everything in the scene to be rendered with that material. Default is null.
	 */
	var overrideMaterial : js.three.Material;
	var autoUpdate : Bool;
	@:overload(function(source:Scene) : Scene { })
	override function copy(source:js.three.Object3D, ?recursive:Bool) : js.three.Object3D;
}