import nanofl.engine.Plugins;

class StdLoadersPlugin
{
	static function main()
	{
		Plugins.registerLoader(new BitmapLoaderPlugin());
		Plugins.registerLoader(new FontLoaderPlugin());
		Plugins.registerLoader(new SoundLoaderPlugin());
		Plugins.registerLoader(new MovieClipLoaderPlugin());
		Plugins.registerLoader(new SpriteLoaderPlugin());
	}
}