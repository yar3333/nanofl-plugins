package js.three;

/**
 * Class for loading a texture.
 * Unlike other loaders, this one emits events instead of using predefined callbacks. So if you're interested in getting notified when things happen, you need to add listeners to the object.
 */
@:native("THREE.TextureLoader") extern class TextureLoader
{
	function new(?manager:js.three.LoadingManager) : Void;
	var manager : js.three.LoadingManager;
	var crossOrigin : String;
	/**
	 * Begin loading from url
	 *
	 * @param url
	 */
	function load(url:String, ?onLoad:js.three.Texture -> Void) : js.three.Texture;
	function setCrossOrigin(crossOrigin:String) : Void;
}