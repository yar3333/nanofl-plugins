package createjs;

/**
 * A loader for JSON manifests. Items inside the manifest are loaded before the loader completes. To load manifests
 * using JSONP, specify a {{#crossLink "LoadItem/callback:property"}}{{/crossLink}} as part of the
 * {{#crossLink "LoadItem"}}{{/crossLink}}. Note that the {{#crossLink "JSONLoader"}}{{/crossLink}} and
 * {{#crossLink "JSONPLoader"}}{{/crossLink}} are higher priority loaders, so manifests <strong>must</strong>
 * set the {{#crossLink "LoadItem"}}{{/crossLink}} {{#crossLink "LoadItem/type:property"}}{{/crossLink}} property
 * to {{#crossLink "AbstractLoader/MANIFEST:property"}}{{/crossLink}}.
 */
extern class ManifestLoader extends createjs.AbstractLoader
{
	function new(loadItem:Dynamic) : Void;
	/**
	 * Determines if the loader can load a specific item. This loader can only load items that are of type
	 * {{#crossLink "AbstractLoader/MANIFEST:property"}}{{/crossLink}}
	 */
	static function canLoadItem(item:Dynamic) : Bool;
}