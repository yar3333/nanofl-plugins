package nanofl.ide.filesystem;

extern class XpcomServerUtils implements nanofl.ide.filesystem.ServerUtils
{
	function new(api:nanofl.ide.NanoApi) : Void;
	function loadDocument(path:String, callb:{ var properties : nanofl.ide.DocumentProperties; var library : nanofl.ide.library.Library; var lastModified : Date; } -> Void) : Void;
	function reloadDocument(path:String, lastModified:Date, callb:{ var properties : nanofl.ide.DocumentProperties; var library : nanofl.ide.library.Library; var lastModified : Date; } -> Void) : Void;
	function saveDocument(path:String, properties:nanofl.ide.DocumentProperties, library:nanofl.ide.library.Library, fileActions:Array<nanofl.ide.filesystem.FileAction>, callb:{ var lastModified : Date; var errorMessage : String; } -> Void) : Void;
	function publishCode(name:String, destDir:String, properties:nanofl.ide.DocumentProperties, library:nanofl.ide.library.Library, callb:{ var success : Bool; var message : String; } -> Void) : Void;
	function getTempDirectory() : String;
	function syncDirectory(src:String, dest:String, callb:Void -> Void) : Void;
	function copyLibraryFiles(srcLibraryDir:String, relativePaths:Array<String>, destLibraryDir:String, callb:Void -> Void) : Void;
	function requestUrl(url:String, ?headers:Array<{ var value : String; var name : String; }>, callb:String -> Void) : Void;
	function downloadFile(url:String, destFilePath:String, ?progress:Float -> Void, complete:Bool -> Void) : Void;
	function openInBrowser(path:String) : Void;
	function uploadFiles(files:Array<js.html.File>, destDir:String, callb:Void -> Void) : Void;
	function loadFilesFromClipboard(destDir:String, callb:Bool -> Void) : Void;
	function saveFilesIntoClipboard(baseDir:String, relativePaths:Array<String>, callb:Void -> Void) : Void;
	function loadTextFile(path:String, callb:{ var text : String; } -> Void) : Void;
	function saveTextFile(path:String, text:String, callb:Void -> Void) : Void;
	function saveBinaryFile(path:String, data:nanofl.engine.Bytes, callb:Void -> Void) : Void;
	function convertImage(src:String, dest:String, quality:Int, callb:Bool -> Void) : Void;
	function convertAudio(src:String, dest:String, quality:Int, callb:Bool -> Void) : Void;
	function runCaptured(filePath:String, args:Array<String>, directory:String, callb:{ var output : String; var exitCode : Int; var error : String; } -> Void) : Void;
	function prepareOutputDirectory(destDir:String, callb:Bool -> Void) : Void;
}