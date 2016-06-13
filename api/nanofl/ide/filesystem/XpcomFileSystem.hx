package nanofl.ide.filesystem;

extern class XpcomFileSystem implements nanofl.engine.FileSystem
{
	function new() : Void;
	function isWindows() : Bool;
	function getTempDirectory() : String;
	function getPluginsDirectory() : String;
	function getCurrentDirectory() : String;
	function getToolPath(windowsRelativePath:String, linuxCommand:String) : String;
	function createDirectory(path:String) : Void;
	function readDirectory(path:String) : Array<String>;
	function exists(path:String) : Bool;
	function getContent(filePath:String) : String;
	function saveContent(filePath:String, text:String, ?append:Bool) : Void;
	function getBinary(filePath:String) : nanofl.engine.Bytes;
	function saveBinary(filePath:String, data:nanofl.engine.Bytes) : Void;
	function isDirectory(path:String) : Bool;
	function run(filePath:String, args:Array<String>, blocking:Bool, ?directory:String) : Int;
	function runCaptured(filePath:String, args:Array<String>, ?input:String, ?directory:String) : { var error : String; var exitCode : Int; var output : String; };
	function copy(srcPath:String, destPath:String) : Bool;
	function syncDirectory(src:String, dest:String) : Void;
	function rename(srcPath:String, destPath:String) : Void;
	function remove(path:String) : Void;
	function findFiles(dirPath:String, ?onFile:String -> Void, ?onDir:String -> Bool) : Void;
	function getPluginPaths() : Array<String>;
	function nativePath(path:String, ?makeAbsolute:Bool) : String;
	function getLastModified(path:String) : Date;
	function getSize(path:String) : Int;
	function zip(srcDir:String, destZip:String) : Bool;
	function unzip(srcZip:String, destDir:String) : Bool;
	function getEnvironmentVariable(name:String) : String;
	function convertImage(srcFile:String, destFile:String, quality:Int) : Bool;
	function convertAudio(srcFile:String, destFile:String, quality:Int) : Bool;
}