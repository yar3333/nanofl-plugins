import createjs.DropShadowFilter;
import models.client.plugins.FilterProperty;
import models.client.plugins.IFilterPlugin;
import models.common.ColorTools;

class DropShadowFilterPlugin implements IFilterPlugin
{
	public function new() { }
	
	public var name = "DropShadowFilter";
	public var label = "Drop Shadow";
	
	public var properties : Array<FilterProperty> =
	[
		{ type:"float",	name:"blurX",		label:"Blur X",			defaultValue:5, 					units:"px",	minValue:0 },
		{ type:"float",	name:"blurY",		label:"Blur Y",			defaultValue:5, 					units:"px",	minValue:0 },
		{ type:"int",	name:"strength", 	label:"Strength",		defaultValue:100, 					units:"%",	minValue:0, maxValue:100 },
		{ type:"int",	name:"quality", 	label:"Quality",		defaultValue:1, 								minValue:1, maxValue:3 },
		{ type:"float",	name:"angle", 		label:"Angle",			defaultValue:45, 					units:"deg",minValue:0, maxValue:360 },
		{ type:"float",	name:"distance",	label:"Distance",		defaultValue:5, 					units:"px",	minValue:0 },
		{ type:"bool",	name:"knockout",	label:"Knockout",		defaultValue:false },
		{ type:"bool",	name:"inner",		label:"Inner shadow",	defaultValue:false },
		{ type:"bool",	name:"hideObject",	label:"Hide object",	defaultValue:false },
		{ type:"color",	name:"color",		label:"Color",			defaultValue:"#000000" },
		{ type:"int",	name:"alpha",		label:"Alpha",			defaultValue:100,	neutralValue:0,	units:"%",	minValue:0,	maxValue:100 },
	];
	
	public function getFilter(params:Dynamic)
	{
		var rgb = ColorTools.parse(params.color);
		var color = (rgb.r << 16) | (rgb.g << 8) | rgb.b;
		
		return new DropShadowFilter
		(
			params.distance,
			params.angle,
			color,
			(params.alpha / 100) * (params.strength / 100),
			params.blurX * 2,
			params.blurY * 2,
			1,
			params.quality,
			params.inner,
			params.knockout,
			params.hideObject
		);
	}
}