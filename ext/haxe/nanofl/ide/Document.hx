package nanofl.ide;

extern class Document
{
	/**
	 * Used when document was opened directly from none-NanoFL format. In other cases is null.
	 */
	var originalPath(default, null) : String;
	/**
	 * Path to NanoFL document file (*.nfl).
	 */
	var path(default, null) : String;
	var properties(default, null) : nanofl.engine.DocumentProperties;
	var library(default, null) : nanofl.ide.EditorLibrary;
	var lastModified(default, null) : Date;
	var navigator(default, null) : nanofl.ide.Navigator;
	var editor(default, null) : nanofl.ide.Editor;
	var undoQueue(default, null) : nanofl.ide.undo.UndoQueue;
	var reloading(default, null) : Bool;
	function activate(isCenterView:Bool) : Void;
	function setProperties(properties:nanofl.engine.DocumentProperties) : Void;
	function updateTitle() : Void;
	function save(?callb:Bool -> Void) : Void;
	function saveAs(?newPath:String, ?callb:Bool -> Void) : Void;
	function export(destPath:String, ?exporter:nanofl.ide.Exporter, ?callb:Bool -> Void) : Void;
	function reload(events:{ var add : String -> Void; var begin : Void -> Void; var end : Void -> Void; var remove : String -> Void; }) : Void;
	function test() : Void;
	function resize(width:Int, height:Int) : Void;
	function canBeSaved() : Bool;
	static function createTemporary(app:nanofl.ide.Application) : nanofl.ide.Document;
	static function load(app:nanofl.ide.Application, path:String, callb:nanofl.ide.Document -> Void) : Void;
	static function import_(app:nanofl.ide.Application, path:String, ?importer:nanofl.ide.Importer, ?callb:nanofl.ide.Document -> Void) : Void;
}