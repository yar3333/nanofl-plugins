package nanofl.ide;

@:autoBuild(stdlib.AbstractClassBuilder.build()) extern class Document extends nanofl.ide.BaseDocument
{
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
	var properties(default, null) : nanofl.ide.DocumentProperties;
	var library(default, null) : nanofl.ide.graphicseditor.EditorLibrary;
	var lastModified(default, null) : Date;
	var navigator(default, null) : nanofl.ide.Navigator;
	var editor(default, null) : nanofl.ide.graphicseditor.Editor;
	var undoQueue(default, null) : nanofl.ide.undo.document.UndoQueue;
	@:isVar
	var busy(get, set) : Bool;
	var isModified(get, never) : Bool;
	var isTemporary(get, never) : Bool;
	override function getTabTextColor() : String;
	override function getTabBackgroundColor() : String;
	override function activate(?isCenterView:Bool) : Void;
	override function deactivate() : Void;
	function setProperties(properties:nanofl.ide.DocumentProperties) : Void;
	override function save(?callb:Bool -> Void) : Void;
	function saveAs(?newPath:String, ?callb:Bool -> Void) : Void;
	function export(?destPath:String, ?plugin:nanofl.ide.plugins.IExporterPlugin, ?callb:Bool -> Void) : Void;
	function reload(callb:Array<nanofl.engine.libraryitems.LibraryItem> -> Void) : Void;
	function reloadWoTransactionForced(callb:Array<nanofl.engine.libraryitems.LibraryItem> -> Void) : Void;
	function test() : Void;
	function publish(?callb:Bool -> Void) : Void;
	function resize(width:Int, height:Int) : Void;
	function canBeSaved() : Bool;
	function canBePublished() : Bool;
	override function dispose() : Void;
	function saveNative(callb:Bool -> Void) : Void;
	override function getShortTitle() : String;
	override function getPath() : String;
	override function getLongTitle() : String;
	override function getIcon() : String;
	function undoStatusChanged() : Void;
	static function createTemporary(app:nanofl.ide.Application, ?properties:nanofl.ide.DocumentProperties) : nanofl.ide.Document;
	static function load(app:nanofl.ide.Application, path:String, callb:nanofl.ide.Document -> Void) : Void;
	static function import_(app:nanofl.ide.Application, path:String, ?importer:nanofl.ide.Importer, ?callb:nanofl.ide.Document -> Void) : Void;
}