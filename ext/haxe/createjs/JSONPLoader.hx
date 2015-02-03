package createjs;

/**
 * A loader for JSONP files, which are JSON-formatted text files, wrapped in a callback. To load regular JSON
 * without a callback use the {{#crossLink "JSONLoader"}}{{/crossLink}} instead. To load JSON-formatted manifests,
 * use {{#crossLink "ManifestLoader"}}{{/crossLink}}, and to load EaselJS SpriteSheets, use
 * {{#crossLink "SpriteSheetLoader"}}{{/crossLink}}.
 */
extern class JSONPLoader extends createjs.AbstractLoader
{
	function new(loadItem:Dynamic) : Void;
	/**
	 * Determines if the loader can load a specific item. This loader can only load items that are of type
	 * {{#crossLink "AbstractLoader/JSONP:property"}}{{/crossLink}}.
	 */
	static function canLoadItem(item:Dynamic) : Bool;
}