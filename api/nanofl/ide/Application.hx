package nanofl.ide;

extern class Application
{
	function new(template:pages.index.TemplateClient, view:nanofl.ide.View) : Void;
	var serverUtils(default, null) : nanofl.ide.filesystem.ServerUtils;
	var newObjectParams : nanofl.ide.graphicseditor.NewObjectParams;
	var document(get, never) : nanofl.ide.Document;
	var clipboard : nanofl.ide.Clipboard;
	var dragAndDrop : nanofl.ide.draganddrop.DragAndDrop;
	var commands : nanofl.ide.commands.Commands;
	var plugins : nanofl.ide.plugins.IPlugins;
	var keyboard : nanofl.ide.keyboard.Keyboard;
	var preferences(default, null) : nanofl.ide.preferences.Preferences;
	var fonts(default, null) : Array<String>;
	var openedFiles : nanofl.ide.IOpenedFiles;
	var recents : nanofl.ide.IRecents;
	var compiler : nanofl.ide.ICompiler;
	var fileSystem : nanofl.engine.FileSystem;
	var pid : String;
	function createNewEmptyDocument(?callb:nanofl.ide.Document -> Void) : Void;
	function openDocument(?path:String, ?callb:nanofl.ide.Document -> Void) : Void;
	function editSymbolCode(symbol:nanofl.engine.libraryitems.InstancableItem) : Void;
	function importDocument(?path:String, ?plugin:nanofl.ide.plugins.IImporterPlugin, ?callb:nanofl.ide.Document -> Void) : Void;
	function quit(?force:Bool, ?exitCode:Int) : Void;
}