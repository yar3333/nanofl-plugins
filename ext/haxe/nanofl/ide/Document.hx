package nanofl.ide;

extern class Document
{
	/**
	 * Document UUID (generated on every document object create).
	 */
	var id(default, null) : String;
	/**
	 * Used when document was opened directly from none-NanoFL format. In other cases is null.
	 */
	var originalPath(default, null) : String;
	/**
	 * Used when document was opened directly from none-NanoFL format. In other cases is null.
	 */
	var originalLastModified(default, null) : Date;
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
	@:isVar
	var busy(get, set) : Bool;
	var isModified(get, never) : Bool;
	var isTemporary(get, never) : Bool;
	function activate(isCenterView:Bool) : Void;
	function setProperties(properties:nanofl.engine.DocumentProperties) : Void;
	function save(?callb:Bool -> Void) : Void;
	function saveAs(?newPath:String, ?callb:Bool -> Void) : Void;
	function export(destPath:String, ?exporter:nanofl.ide.Exporter, ?callb:Bool -> Void) : Void;
	function reload(callb:Array<nanofl.engine.libraryitems.LibraryItem> -> Void) : Void;
	function reloadWoTransactionForced(callb:Array<nanofl.engine.libraryitems.LibraryItem> -> Void) : Void;
	function test() : Void;
	function resize(width:Int, height:Int) : Void;
	function canBeSaved() : Bool;
	function dispose() : Void;
	static function createTemporary(app:nanofl.ide.Application) : nanofl.ide.Document;
	static function load(app:nanofl.ide.Application, path:String, callb:nanofl.ide.Document -> Void) : Void;
	static function import_(app:nanofl.ide.Application, path:String, ?importer:nanofl.ide.Importer, ?callb:nanofl.ide.Document -> Void) : Void;
	static function disposeAll() : Void;
}