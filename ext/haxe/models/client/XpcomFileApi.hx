package models.client;

extern class XpcomFileApi implements models.common.FileApi
{
	function new() : Void;
	function getTempDirectory() : String;
	function getToolsDirectory() : String;
	function getPluginsDirectory() : String;
	function readDirectory(path:String) : Array<String>;
	function exists(path:String) : Bool;
	function getContent(filePath:String) : String;
	function saveContent(filePath:String, text:String) : Void;
	function isDirectory(path:String) : Bool;
	function run(filePath:String, args:Array<String>, blocking:Bool) : Void;
	function copy(srcPath:String, destPath:String) : Void;
	function rename(oldName:String, newName:String) : Void;
	function remove(path:String) : Void;
	function findFiles(dirPath:String, ?onFile:String -> Void, ?onDir:String -> Bool) : Void;
	function getPluginPaths() : Array<String>;
	function nativePath(path:String) : String;
	function basicRemove(path:String) : Void;
	function basicRename(oldPath:String, newPath:String) : Void;
}