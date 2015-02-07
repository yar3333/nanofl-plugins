import createjs.QuatizeColorsFilter;
import models.client.plugins.FilterProperty;
import models.client.plugins.IFilterPlugin;
import models.common.ColorTools;
import models.common.Plugins;

class QuatizeColorsFilterPlugin implements IFilterPlugin
{
	static function main() Plugins.registerFilter(new QuatizeColorsFilterPlugin());
	
	public function new() { }
	
	public var name = "QuatizeColorsFilter";
	public var label = "Quatize Colors";
	
	public var properties : Array<FilterProperty> =
	[
		{ type:"int", name:"maxColors", label:"Colors", defaultValue:16, minValue:2, maxValue:256 }
	];
	
	public function getFilter(params:Dynamic)
	{
		return new QuatizeColorsFilter(params.maxColors);
	}
}