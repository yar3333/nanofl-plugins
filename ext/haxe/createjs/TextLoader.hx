package createjs;

/**
 * A loader for Text files.
 */
extern class TextLoader extends createjs.AbstractLoader
{
	function new(loadItem:Dynamic) : Void;
	/**
	 * Determines if the loader can load a specific item. This loader loads items that are of type {{#crossLink "AbstractLoader/TEXT:property"}}{{/crossLink}},
	 * but is also the default loader if a file type can not be determined.
	 */
	static function canLoadItem(item:Dynamic) : Bool;
}