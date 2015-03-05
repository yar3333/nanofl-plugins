package models.client;

typedef Application =
{
	function addRecent(path:String) : Void;
	var clipboard : models.client.Clipboard;
	function createNewEmptyDocument(addEmptySceneToLibrary:Bool, ?docProp:models.common.DocumentProperties) : models.client.Document;
	var document : models.client.Document;
	var fileApi : models.client.XpcomFileApi;
	function generateTempDocumentFilePath() : String;
	function loadDocument(path:String, ?activateAfterLoad:Bool, ?callb:models.client.Document -> Void) : Void;
	var newObjectParams : models.client.NewObjectParams;
	var plugins : models.client.IPlugins;
	function quit() : Void;
	function saveDocumentIfNeed(callb:Void -> Void) : Void;
	var serverApi : models.client.ServerApi;
};