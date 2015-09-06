package nanofl.ide;

extern interface ServerApi
{
	function getTempDirectory() : String;
	function copyDir(src:String, dest:String, ?overwrite:Bool, callb:Bool -> Void) : Void;
	function copyLibraryFiles(srcLibraryDir:String, relativePaths:Array<String>, destLibraryDir:String, callb:Void -> Void) : Void;
	function requestUrl(url:String, callb:String -> Void) : Void;
	function openInBrowser(url:String) : Void;
	function uploadFiles(files:Array<js.html.File>, destDir:String, callb:Void -> Void) : Void;
	function getFonts() : Array<String>;
	function loadFilesFromClipboard(destDir:String, callb:Bool -> Void) : Void;
	function saveFilesIntoClipboard(baseDir:String, relativePaths:Array<String>, callb:Void -> Void) : Void;
}