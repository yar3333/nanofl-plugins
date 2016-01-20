package createjs;

/**
 * A loader for SVG files.
 */
extern class SVGLoader extends createjs.AbstractLoader
{
	function new(loadItem:Dynamic, preferXHR:Bool) : Void;
	/**
	 * Determines if the loader can load a specific item. This loader can only load items that are of type
	 * {{#crossLink "AbstractLoader/SVG:property"}}{{/crossLink}}
	 */
	static function canLoadItem(item:Dynamic) : Bool;
}