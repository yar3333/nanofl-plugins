package nanofl.ide.undo;

extern class UndoQueue
{
	/**
	 * This method may be called several times with different operations.
	 */
	@:profile
	function beginTransaction(operations:{ @:optional
	var document : Bool; @:optional
	var element : nanofl.engine.elements.Element; @:optional
	var elements : Bool; @:optional
	var figure : Bool; @:optional
	var libraryAddItem : String; @:optional
	var libraryChangeItems : Array<String>; @:optional
	var libraryRemoveItems : Array<String>; @:optional
	var libraryRenameItem : { var newNamePath : String; var oldNamePath : String; }; @:optional
	var timeline : Bool; @:optional
	var transformations : Bool; }) : Void;
	@:profile
	function cancelTransaction() : Void;
	@:profile
	function revertTransaction() : Void;
	@:profile
	function forgetTransaction() : Void;
	@:profile
	function commitTransaction() : Void;
	@:profile
	function undo() : Void;
	@:profile
	function redo() : Void;
	function canUndo() : Bool;
	function canRedo() : Bool;
	function documentSaved() : Void;
	function isDocumentModified() : Bool;
	function toString() : String;
}