import createjs.BlurFilter;
import nanofl.engine.plugins.FilterProperty;
import nanofl.engine.plugins.IFilterPlugin;

class BlurFilterPlugin implements IFilterPlugin
{
	public function new() { }
	
	public var name = "BlurFilter";
	public var label = "Blur";
	
	public var properties : Array<FilterProperty> =
	[
		{ type:"float",	name:"blurX",	label:"Blur X",		defaultValue:10, neutralValue:0, units:"px",	minValue:0 },
		{ type:"float",	name:"blurY",	label:"Blur Y",		defaultValue:10, neutralValue:0, units:"px",	minValue:0 },
		{ type:"int",	name:"quality", label:"Quality",	defaultValue:1, 								minValue:1, maxValue:3 }
	];
	
	public function getFilter(params:Dynamic)
	{
		return new BlurFilter(params.blurX, params.blurY, params.quality);
	}
}