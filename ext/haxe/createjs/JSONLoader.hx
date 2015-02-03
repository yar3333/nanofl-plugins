package createjs;

/**
 * A loader for JSON files. To load JSON cross-domain, use JSONP and the {{#crossLink "JSONPLoader"}}{{/crossLink}}
 * instead. To load JSON-formatted manifests, use {{#crossLink "ManifestLoader"}}{{/crossLink}}, and to
 * load EaselJS SpriteSheets, use {{#crossLink "SpriteSheetLoader"}}{{/crossLink}}.
 */
extern class JSONLoader extends createjs.AbstractLoader
{
	function new(loadItem:Dynamic) : Void;
	/**
	 * Determines if the loader can load a specific item. This loader can only load items that are of type
	 * {{#crossLink "AbstractLoader/JSON:property"}}{{/crossLink}}.
	 */
	static function canLoadItem(item:Dynamic) : Bool;
}