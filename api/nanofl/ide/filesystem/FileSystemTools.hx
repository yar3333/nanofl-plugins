package nanofl.ide.filesystem;

extern class FileSystemTools
{
	static function findFiles(fileSystem:nanofl.engine.FileSystem, dirPath:String, ?onFile:String -> Void, ?onDir:String -> Bool) : Void;
	/**
	 * Process each file, matched by oldName pattern (args example: oldName="folderA/myFileNameA.*", newName="folderB/myFileNameB.*").
	 */
	static function processFilePatternPair(fileSystem:nanofl.engine.FileSystem, oldName:String, newName:String, callb:String -> String -> Void) : Void;
	/**
	 * Process each file, matched by path pattern (path example: "folder/myFileName.*").
	 */
	static function processFilePattern(fileSystem:nanofl.engine.FileSystem, path:String, callb:String -> Void) : Void;
	static function getPluginPaths(fileSystem:nanofl.engine.FileSystem) : Array<String>;
	static function convertImage(fileSystem:nanofl.engine.FileSystem, srcFile:String, destFile:String, quality:Int) : Bool;
	static function convertAudio(fileSystem:nanofl.engine.FileSystem, srcFile:String, destFile:String, quality:Int) : Bool;
	static function wrapCmdIfNeed<T>(fileSystem:nanofl.engine.FileSystem, filePath:String, args:Array<String>, directory:String, callb:String -> Array<String> -> T) : T;
}