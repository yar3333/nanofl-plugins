package nanofl.ide.plugins;

typedef PluginApi =
{
	/**
	 * FileSystem functions.
	 */
	var fileSystem(default, null) : nanofl.engine.FileApi;
	/**
	 * Known font names.
	 */
	var fonts(default, null) : Array<String>;
	/**
	 * User preferences.
	 */
	var preferences(default, null) : nanofl.ide.Preferences;
	var serverApi(default, null) : nanofl.ide.ServerApi;
};