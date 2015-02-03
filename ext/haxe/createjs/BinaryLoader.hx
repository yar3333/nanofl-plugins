package createjs;

/**
 * A loader for binary files. This is useful for loading web audio, or content that requires an ArrayBuffer.
 */
extern class BinaryLoader extends createjs.AbstractLoader
{
	function new(loadItem:Dynamic) : Void;
	/**
	 * Determines if the loader can load a specific item. This loader can only load items that are of type
	 * {{#crossLink "AbstractLoader/BINARY:property"}}{{/crossLink}}
	 */
	static function canLoadItem(item:Dynamic) : Bool;
}