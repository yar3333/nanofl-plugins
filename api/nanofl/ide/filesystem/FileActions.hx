package nanofl.ide.filesystem;

extern class FileActions
{
	static function process(fileSystem:nanofl.engine.FileSystem, path:String, actions:Array<nanofl.ide.filesystem.FileAction>) : Void;
	static function fromUndoOperations(operations:Array<nanofl.ide.undo.document.Operation>) : Array<nanofl.ide.filesystem.FileAction>;
}