import createjs.GlowFilter;
import models.client.plugins.FilterProperty;
import models.client.plugins.IFilterPlugin;

class GlowFilterPlugin implements IFilterPlugin
{
	public function new() { }
	
	public var name = "GlowFilter";
	public var label = "Glow";
	
	public var properties : Array<FilterProperty> =
	[
		{ type:"float",	name:"blurX",		label:"Blur X",			defaultValue:5, 					units:"px",	minValue:0 },
		{ type:"float",	name:"blurY",		label:"Blur Y",			defaultValue:5, 					units:"px",	minValue:0 },
		{ type:"int",	name:"strength", 	label:"Strength",		defaultValue:100, 					units:"%",	minValue:0, maxValue:100 },
		{ type:"int",	name:"quality", 	label:"Quality",		defaultValue:1, 								minValue:1, maxValue:3 },
		{ type:"color",	name:"color",		label:"Color",			defaultValue:"#000000" },
		{ type:"int",	name:"alpha",		label:"Alpha",			defaultValue:100,	neutralValue:0,	units:"%",	minValue:0,	maxValue:100 },
		{ type:"bool",	name:"knockout",	label:"Knockout",		defaultValue:false },
		{ type:"bool",	name:"inner",		label:"Inner shadow",	defaultValue:false },
	];
	
	public function getFilter(params:Dynamic)
	{
		var rgb = models.common.ColorTools.parse(params.color);
		var color = (rgb.r << 16) | (rgb.g << 8) | rgb.b;
		
		return new GlowFilter
		(
			color,
			(params.alpha / 100) * (params.strength / 100),
			params.blurX * 2,
			params.blurY * 2,
			1,
			params.quality,
			params.inner,
			params.knockout
		);
	}
}