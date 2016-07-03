package nanofl.ide;

typedef NanoApi =
{
	/**
	 * FileSystem functions.
	 */
	var fileSystem(default, null) : nanofl.engine.FileSystem;
	/**
	 * Known font names.
	 */
	var fonts(default, null) : Array<String>;
	/**
	 * User preferences.
	 */
	var preferences(default, null) : nanofl.ide.preferences.Preferences;
};