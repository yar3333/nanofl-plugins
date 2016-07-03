package nanofl.ide.preferences;

extern class ApplicationPreferences
{
	function new(storage:nanofl.ide.preferences.IPreferenceStorage) : Void;
	var haxeCompilerPath(get, set) : String;
	var checkNewVersionPeriod(get, set) : String;
	var checkNewVersionLastDate(get, set) : Float;
	var forceSoftwareRenderer(get, set) : Bool;
	var recentDocuments(get, set) : String;
	var previewHeight(get, set) : Int;
	var registered(get, set) : Bool;
	var firstStartTime(get, set) : Float;
	var key(get, set) : String;
}