package nanofl.ide.plugins;

extern class PublisherPlugins
{
	static var plugins(default, null) : Map<String, nanofl.ide.plugins.IPublisherPlugin>;
	static function register(plugin:nanofl.ide.plugins.IPublisherPlugin) : Void;
}