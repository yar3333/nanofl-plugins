import nanofl.engine.plugins.FilterPlugins;

class StdFiltersPlugin
{
	static function main()
	{
		FilterPlugins.register(new DropShadowFilterPlugin());
		FilterPlugins.register(new BoxBlurFilterPlugin());
		FilterPlugins.register(new GlowFilterPlugin());
		FilterPlugins.register(new AdjustColorFilterPlugin());
		FilterPlugins.register(new GaussianBlurFilterPlugin());
	}
}