package nanofl.ide.undo;

extern class UndoQueue
{
	/**
	 * This method may be called several times with different operations.
	 */
	function beginTransaction(operations:{ @:optional var document : Bool; @:optional var element : nanofl.engine.elements.Element; @:optional var elements : Bool; @:optional var figure : Bool; @:optional var libraryAddItem : String; @:optional var libraryChangeItems : Array<String>; @:optional var libraryRemoveItems : Array<String>; @:optional var libraryRenameItem : { var oldNamePath : String; var newNamePath : String; }; @:optional var timeline : Bool; @:optional var transformations : Bool; }) : Void;
	function cancelTransaction() : Void;
	function revertTransaction() : Void;
	function forgetTransaction() : Void;
	function commitTransaction() : Void;
	function undo() : Void;
	function redo() : Void;
	function canUndo() : Bool;
	function canRedo() : Bool;
	function documentSaved() : Void;
	function isDocumentModified() : Bool;
	function toString() : String;
}