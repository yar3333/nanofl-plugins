package models.client;

extern class Document
{
	var path(default, null) : String;
	var properties(default, null) : models.common.DocumentProperties;
	var library(default, null) : models.client.EditorLibrary;
	var neverSaved(default, null) : Bool;
	var navigator(default, null) : models.client.Navigator;
	var editor(default, null) : models.client.Editor;
	var undoQueue(default, null) : models.client.undo.UndoQueue;
	function activate(isCenterView:Bool) : Void;
	function setProperties(properties:models.common.DocumentProperties) : Void;
	function updateTitle() : Void;
	function save(?callb:Void -> Void) : Void;
	function saveAs(?newPath:String, ?callb:Void -> Void) : Void;
	function test() : Void;
}