package nanofl.ide;

extern class Document
{
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
	function save(?callb:Void -> Void) : Void;
	function saveAs(?newPath:String, ?callb:Void -> Void) : Void;
	function resize(width:Int, height:Int) : Void;
	function test() : Void;
}