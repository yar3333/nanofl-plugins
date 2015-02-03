package createjs;

/**
 * A loader for EaselJS SpriteSheets. Images inside the spritesheet definition are loaded before the loader
 * completes. To load SpriteSheets using JSONP, specify a {{#crossLink "LoadItem/callback:property"}}{{/crossLink}}
 * as part of the {{#crossLink "LoadItem"}}{{/crossLink}}. Note that the {{#crossLink "JSONLoader"}}{{/crossLink}}
 * and {{#crossLink "JSONPLoader"}}{{/crossLink}} are higher priority loaders, so SpriteSheets <strong>must</strong>
 * set the {{#crossLink "LoadItem"}}{{/crossLink}} {{#crossLink "LoadItem/type:property"}}{{/crossLink}} property
 * to {{#crossLink "AbstractLoader/SPRITESHEET:property"}}{{/crossLink}}.
 */
extern class SpriteSheetLoader extends createjs.AbstractLoader
{
	function new(loadItem:Dynamic) : Void;
	/**
	 * Determines if the loader can load a specific item. This loader can only load items that are of type
	 * {{#crossLink "AbstractLoader/SPRITESHEET:property"}}{{/crossLink}}
	 */
	static function canLoadItem(item:Dynamic) : Bool;
}