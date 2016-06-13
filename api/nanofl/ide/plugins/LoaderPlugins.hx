package nanofl.ide.plugins;

extern class LoaderPlugins
{
	static var plugins(default, null) : Map<String, nanofl.ide.plugins.ILoaderPlugin>;
	static function register(plugin:nanofl.ide.plugins.ILoaderPlugin) : Void;
}