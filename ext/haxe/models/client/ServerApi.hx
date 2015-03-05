package models.client;

extern interface ServerApi
{
	function getTempDirectory() : String;
	function copyDir(fromPath:String, toPath:String, ?callb:Void -> Void) : Void;
	function requestUrl(url:String, callb:String -> Void) : Void;
	function openInBrowser(url:String) : Void;
	function uploadFileAsLibraryItem(library:models.common.Library, folderPath:String, file:js.html.File, callb:models.common.libraryitems.LibraryItem -> Void) : Void;
	function getFonts() : Array<String>;
}