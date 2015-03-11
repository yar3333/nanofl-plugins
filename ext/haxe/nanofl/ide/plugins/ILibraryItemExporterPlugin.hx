package nanofl.ide.plugins;

extern interface ILibraryItemExporterPlugin
{
	/**
	 * Internal plugin name.
	 */
	var name : String;
	/**
	 * Like "Adobe Flash Document (*.fla)".
	 */
	var menuItemName : String;
	/**
	 * Css class or image url in "url(pathToImage)" format.
	 */
	var menuItemIcon : String;
	/**
	 * Like "Flash document".
	 */
	var fileFilterDescription : String;
	/**
	 * For example: [ "fla", "xfl" ].
	 */
	var fileFilterExtensions : Array<String>;
	/**
	 * For example: "fla".
	 */
	var fileDefaultExtension : String;
	function exportLibraryItem(fileApi:nanofl.engine.FileApi, item:nanofl.engine.libraryitems.LibraryItem, destFilePath:String, libraryDir:String) : Bool;
}