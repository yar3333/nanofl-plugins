package models.client.plugins;

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
	var properties : Array<models.client.plugins.FilterProperty>;
	function getFilter(params:Dynamic) : createjs.Filter;
}