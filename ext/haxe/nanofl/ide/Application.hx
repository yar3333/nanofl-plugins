package nanofl.ide;

typedef Application =
{
	function addRecent(path:String) : Void;
	var clipboard : nanofl.ide.Clipboard;
	function createNewEmptyDocument(addEmptySceneToLibrary:Bool, ?originalPath:String) : nanofl.ide.Document;
	var document : nanofl.ide.Document;
	var fileApi : nanofl.ide.XpcomFileApi;
	function generateTempDocumentFilePath() : String;
	var newObjectParams : nanofl.ide.NewObjectParams;
	function openDocument(path:String, ?callb:nanofl.ide.Document -> Void) : Void;
	var pid : String;
	var plugins : nanofl.ide.IPlugins;
	function quit(?force:Bool, ?exitCode:Int) : Void;
	function saveDocumentIfNeed(callb:Void -> Void) : Void;
	var serverApi : nanofl.ide.ServerApi;
};