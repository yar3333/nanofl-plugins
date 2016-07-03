package nanofl.ide.preferences;

extern class Preferences
{
	function new(storage:nanofl.ide.preferences.IPreferenceStorage) : Void;
	var storage : nanofl.ide.preferences.IPreferenceStorage;
	var application(default, null) : nanofl.ide.preferences.ApplicationPreferences;
}