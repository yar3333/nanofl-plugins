package nanofl.ide.filesystem;

extern class XpcomServerUtils implements nanofl.ide.filesystem.ServerUtils
{
	function new(api:nanofl.ide.NanoApi) : Void;
	function loadDocument(path:String, callb:{ var properties : nanofl.ide.DocumentProperties; var library : nanofl.ide.library.Library; var lastModified : Date; } -> Void) : Void;
	function reloadDocument(path:String, lastModified:Date, callb:{ var properties : nanofl.ide.DocumentProperties; var library : nanofl.ide.library.Library; var lastModified : Date; } -> Void) : Void;
	function saveDocument(path:String, properties:nanofl.ide.DocumentProperties, library:nanofl.ide.library.Library, textureAtlases:Map<String, nanofl.ide.textureatlas.TextureAtlas>, fileActions:Array<nanofl.ide.filesystem.FileAction>, callb:{ var lastModified : Date; var generatorError : String; } -> Void) : Void;
	function publishDocument(path:String, properties:nanofl.ide.DocumentProperties, library:nanofl.ide.library.Library, textureAtlases:Map<String, nanofl.ide.textureatlas.TextureAtlas>, callb:{ var success : Bool; var message : String; } -> Void) : Void;
	function getTempDirectory() : String;
	function syncDirectory(src:String, dest:String, callb:Void -> Void) : Void;
	function copyLibraryFiles(srcLibraryDir:String, relativePaths:Array<String>, destLibraryDir:String, callb:Void -> Void) : Void;
	function requestUrl(url:String, ?headers:Array<{ var value : String; var name : String; }>, callb:String -> Void) : Void;
	function openInBrowser(path:String) : Void;
	function uploadFiles(files:Array<js.html.File>, destDir:String, callb:Void -> Void) : Void;
	function loadFilesFromClipboard(destDir:String, callb:Bool -> Void) : Void;
	function saveFilesIntoClipboard(baseDir:String, relativePaths:Array<String>, callb:Void -> Void) : Void;
	function loadCodeFile(path:String, callb:{ var text : String; } -> Void) : Void;
	function saveCodeFile(path:String, text:String, callb:Void -> Void) : Void;
}