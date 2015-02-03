package createjs;

/**
 * A loader for CSS files.
 */
extern class XMLLoader extends createjs.AbstractLoader
{
	function new(loadItem:Dynamic) : Void;
	/**
	 * Determines if the loader can load a specific item. This loader can only load items that are of type
	 * {{#crossLink "AbstractLoader/XML:property"}}{{/crossLink}}.
	 */
	static function canLoadItem(item:Dynamic) : Bool;
}