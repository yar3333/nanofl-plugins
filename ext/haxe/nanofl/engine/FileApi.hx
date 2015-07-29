package nanofl.engine;

extern interface FileApi
{
	function getTempDirectory() : String;
	function getPluginsDirectory() : String;
	function getToolsDirectory() : String;
	function readDirectory(dir:String) : Array<String>;
	function getContent(filePath:String) : String;
	function saveContent(filePath:String, text:String, ?append:Bool) : Void;
	function saveBinary(filePath:String, data:nanofl.engine.Bytes) : Void;
	function exists(path:String) : Bool;
	function isDirectory(path:String) : Bool;
	function run(filePath:String, args:Array<String>, blocking:Bool) : Int;
	function copy(srcPath:String, destPath:String) : Void;
	function rename(oldPath:String, newPath:String) : Void;
	function remove(path:String) : Void;
	function findFiles(dirPath:String, ?onFile:String -> Void, ?onDir:String -> Bool) : Void;
	function getPluginPaths() : Array<String>;
	function getLastModified(path:String) : Date;
	function zip(srcDir:String, destZip:String) : Bool;
	function unzip(srcZip:String, destDir:String) : Bool;
	function getEnvironmentVariable(name:String) : String;
}