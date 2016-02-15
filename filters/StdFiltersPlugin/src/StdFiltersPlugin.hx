import nanofl.engine.Plugins;

class StdFiltersPlugin
{
	static function main()
	{
		Plugins.registerFilter(new DropShadowFilterPlugin());
		Plugins.registerFilter(new BoxBlurFilterPlugin());
		Plugins.registerFilter(new GlowFilterPlugin());
		Plugins.registerFilter(new AdjustColorFilterPlugin());
		Plugins.registerFilter(new GaussianBlurFilterPlugin());
	}
}