package js.three;

/**
 * Base class for implementing loaders.
 *
 * Events:
 *     load
 *         Dispatched when the image has completed loading
 *         content — loaded image
 *
 *     error
 *
 *          Dispatched when the image can't be loaded
 *          message — error message
 */
@:native("THREE.Loader") extern class Loader
{
	function new() : Void;
	/**
	 * Will be called when load starts.
	 * The default is a function with empty body.
	 */
	var onLoadStart : Void -> Void;
	/**
	 * Will be called while load progresses.
	 * The default is a function with empty body.
	 */
	var onLoadProgress : Void -> Void;
	/**
	 * Will be called when load completes.
	 * The default is a function with empty body.
	 */
	var onLoadComplete : Void -> Void;
	/**
	 * default — null.
	 * If set, assigns the crossOrigin attribute of the image to the value of crossOrigin, prior to starting the load.
	 */
	var crossOrigin : String;
	function extractUrlBase(url:String) : String;
	function initMaterials(materials:Array<js.three.Material>, texturePath:String) : Array<js.three.Material>;
	function createMaterial(m:js.three.Material, texturePath:String, ?crossOrigin:String) : Bool;
	static var Handlers : js.three.LoaderHandler;
}