package nanofl.ide;

typedef Application =
{
	function addRecent(path:String) : Void;
	var clipboard : nanofl.ide.Clipboard;
	function createNewEmptyDocument(addEmptySceneToLibrary:Bool, ?docProp:nanofl.engine.DocumentProperties) : nanofl.ide.Document;
	var document : nanofl.ide.Document;
	var fileApi : nanofl.ide.XpcomFileApi;
	function generateTempDocumentFilePath() : String;
	function loadDocument(path:String, ?activateAfterLoad:Bool, ?callb:nanofl.ide.Document -> Void) : Void;
	var newObjectParams : nanofl.ide.NewObjectParams;
	var pid : String;
	var plugins : nanofl.ide.IPlugins;
	function quit(?force:Bool) : Void;
	function saveDocumentIfNeed(callb:Void -> Void) : Void;
	var serverApi : nanofl.engine.ServerApi;
};