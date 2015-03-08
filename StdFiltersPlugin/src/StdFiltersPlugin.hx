import nanofl.engine.Plugins;

class StdFiltersPlugin
{
	static function main()
	{
		Plugins.registerFilter(new DropShadowFilterPlugin());
		Plugins.registerFilter(new BlurFilterPlugin());
		Plugins.registerFilter(new GlowFilterPlugin());
		Plugins.registerFilter(new AdjustColorFilterPlugin());
	}
}