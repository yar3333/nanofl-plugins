package nanofl.engine;

extern interface ServerApi
{
	function getTempDirectory() : String;
	function copyDir(src:String, dest:String, ?overwrite:Bool, ?callb:Void -> Void) : Void;
	function requestUrl(url:String, callb:String -> Void) : Void;
	function openInBrowser(url:String) : Void;
	function uploadFileAsLibraryItem(library:nanofl.engine.Library, folderPath:String, file:js.html.File, callb:nanofl.engine.libraryitems.LibraryItem -> Void) : Void;
	function getFonts() : Array<String>;
}