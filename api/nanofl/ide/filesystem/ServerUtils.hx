package nanofl.ide.filesystem;

extern interface ServerUtils
{
	function getTempDirectory() : String;
	function syncDirectory(src:String, dest:String, callb:Void -> Void) : Void;
	function copyLibraryFiles(srcLibraryDir:String, relativePaths:Array<String>, destLibraryDir:String, callb:Void -> Void) : Void;
	function requestUrl(url:String, ?headers:Array<{ var value : String; var name : String; }>, callb:String -> Void) : Void;
	function downloadFile(url:String, destFilePath:String, ?progress:Float -> Void, complete:Bool -> Void) : Void;
	function openInBrowser(url:String) : Void;
	function uploadFiles(files:Array<js.html.File>, destDir:String, callb:Void -> Void) : Void;
	function loadFilesFromClipboard(destDir:String, callb:Bool -> Void) : Void;
	function saveFilesIntoClipboard(baseDir:String, relativePaths:Array<String>, callb:Void -> Void) : Void;
	function runCaptured(filePath:String, args:Array<String>, directory:String, callb:{ var output : String; var exitCode : Int; var error : String; } -> Void) : Void;
	function loadTextFile(path:String, callb:{ var text : String; } -> Void) : Void;
	function saveTextFile(path:String, text:String, callb:Void -> Void) : Void;
	function saveBinaryFile(path:String, data:nanofl.engine.Bytes, callb:Void -> Void) : Void;
	function convertImage(src:String, dest:String, quality:Int, callb:Bool -> Void) : Void;
	function convertAudio(src:String, dest:String, quality:Int, callb:Bool -> Void) : Void;
	function prepareOutputDirectory(destDir:String, callb:Bool -> Void) : Void;
}