package nanofl.ide.plugins;

extern class CustomizablePluginTools
{
	static function getPreferenceKey(plugin:nanofl.ide.plugins.CustomizablePlugin) : String;
	static function getParams(plugin:nanofl.ide.plugins.CustomizablePlugin, preferences:nanofl.ide.Preferences) : Dynamic;
}