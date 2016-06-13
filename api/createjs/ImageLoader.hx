package createjs;

/**
 * A loader for image files.
 */
extern class ImageLoader extends createjs.AbstractLoader
{
	function new(loadItem:Dynamic, preferXHR:Bool) : Void;
	/**
	 * Determines if the loader can load a specific item. This loader can only load items that are of type
	 * {{#crossLink "AbstractLoader/IMAGE:property"}}{{/crossLink}}.
	 */
	static function canLoadItem(item:Dynamic) : Bool;
}