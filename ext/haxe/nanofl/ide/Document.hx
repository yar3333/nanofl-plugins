package nanofl.ide;

extern class Document
{
	/**
	 * Used when document was imported from none-NanoFL format. In other cases is null.
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
	function activate(isCenterView:Bool) : Void;
	function setProperties(properties:nanofl.engine.DocumentProperties) : Void;
	function updateTitle() : Void;
	function save(?callb:Bool -> Void) : Void;
	function saveAs(?newPath:String, ?callb:Bool -> Void) : Void;
	function export(path:String, callb:Bool -> Void) : Void;
	function resize(width:Int, height:Int) : Void;
	function wasReloaded(lastModified:Date) : Void;
	function test() : Void;
	static function createTemporary(app:nanofl.ide.Application, ?originalPath:String) : nanofl.ide.Document;
	static function load(app:nanofl.ide.Application, path:String, callb:nanofl.ide.Document -> Void) : Void;
}