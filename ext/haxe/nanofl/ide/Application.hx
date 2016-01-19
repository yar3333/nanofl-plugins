package nanofl.ide;

typedef Application =
{
	function addRecent(path:String) : Void;
	var clipboard : nanofl.ide.Clipboard;
	var commands : nanofl.ide.commands.Commands;
	function createNewEmptyDocument(?callb:nanofl.ide.Document -> Void) : Void;
	var document : nanofl.ide.Document;
	var dragAndDrop : nanofl.ide.draganddrop.DragAndDrop;
	var fileSystem : nanofl.engine.FileApi;
	var fonts : Array<String>;
	function importDocument(?path:String, ?plugin:nanofl.ide.plugins.IImporterPlugin, ?callb:nanofl.ide.Document -> Void) : Void;
	var keyboard : nanofl.ide.keyboard.Keyboard;
	var newObjectParams : nanofl.ide.NewObjectParams;
	function openDocument(?path:String, ?callb:nanofl.ide.Document -> Void) : Void;
	var pid : String;
	var plugins : nanofl.ide.IPlugins;
	var preferences : nanofl.ide.Preferences;
	function quit(?force:Bool, ?exitCode:Int) : Void;
	var serverUtils : nanofl.ide.ServerUtils;
};