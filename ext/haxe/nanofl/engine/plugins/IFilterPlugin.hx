package nanofl.engine.plugins;

extern interface IFilterPlugin
{
	/**
	 * Internal filter name (for example: "DropShadowFilter").
	 * Used as xml tag on saving.
	 */
	var name : String;
	/**
	 * Filter name for screen forms (for example: "Drop Shadow").
	 */
	var label : String;
	/**
	 * Custom filter properties.
	 */
	var properties : Array<nanofl.engine.CustomProperty>;
	function getFilter(params:Dynamic) : createjs.Filter;
}