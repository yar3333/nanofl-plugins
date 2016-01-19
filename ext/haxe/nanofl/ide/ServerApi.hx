package nanofl.ide;

extern interface ServerApi
{
	function getTempDirectory() : String;
	function syncDirectory(src:String, dest:String, callb:Void -> Void) : Void;
	function copyLibraryFiles(srcLibraryDir:String, relativePaths:Array<String>, destLibraryDir:String, callb:Void -> Void) : Void;
	function requestUrl(url:String, ?headers:Array<{ var value : String; var name : String; }>, callb:String -> Void) : Void;
	function openInBrowser(url:String) : Void;
	function uploadFiles(files:Array<js.html.File>, destDir:String, callb:Void -> Void) : Void;
	function loadFilesFromClipboard(destDir:String, callb:Bool -> Void) : Void;
	function saveFilesIntoClipboard(baseDir:String, relativePaths:Array<String>, callb:Void -> Void) : Void;
}