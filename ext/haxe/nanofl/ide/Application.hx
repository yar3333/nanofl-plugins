package nanofl.ide;

typedef Application =
{
	function addRecent(path:String) : Void;
	var clipboard : nanofl.ide.Clipboard;
	function createNewEmptyDocument() : nanofl.ide.Document;
	var document : nanofl.ide.Document;
	function exportDocument(exporter:nanofl.ide.plugins.IExporterPlugin, ?callb:Bool -> Void) : Void;
	var fileApi : nanofl.ide.XpcomFileApi;
	function generateTempDocumentFilePath() : String;
	var helpers : nanofl.ide.Helpers;
	function importDocument(importer:nanofl.ide.plugins.IImporterPlugin, ?callb:nanofl.ide.Document -> Void) : Void;
	var newObjectParams : nanofl.ide.NewObjectParams;
	function openDocument(?path:String, ?callb:nanofl.ide.Document -> Void) : Void;
	var pid : String;
	var plugins : nanofl.ide.IPlugins;
	function quit(?force:Bool, ?exitCode:Int) : Void;
	function saveDocumentIfNeed(callb:Bool -> Void) : Void;
	var serverApi : nanofl.ide.ServerApi;
};