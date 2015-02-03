import models.common.Plugins;

class StdFiltersPlugin
{
	static function main()
	{
		haxe.Log.trace = function(v, ?_) models.common.Log.trace(v);
		
		Plugins.registerFilter(new DropShadowFilterPlugin());
		Plugins.registerFilter(new BlurFilterPlugin());
		Plugins.registerFilter(new GlowFilterPlugin());
		Plugins.registerFilter(new AdjustColorFilterPlugin());
	}
}