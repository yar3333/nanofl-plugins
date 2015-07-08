package nanofl.ide;

extern interface ServerApi
{
	function getTempDirectory() : String;
	function copyDir(src:String, dest:String, ?overwrite:Bool, callb:Void -> Void) : Void;
	function requestUrl(url:String, callb:String -> Void) : Void;
	function openInBrowser(url:String) : Void;
	function uploadFilesAsLibraryItems(library:nanofl.engine.Library, folderPath:String, files:Array<js.html.File>, callb:Array<nanofl.engine.libraryitems.LibraryItem> -> Void) : Void;
	function getFonts() : Array<String>;
}