package nanofl.ide.plugins;

extern interface ILibraryItemImporterPlugin
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
	 * Import file as single library item then call callb(item) for success or callb(null) for fail.
	 */
	function importLibraryItem(fileApi:nanofl.engine.FileApi, srcFilePath:String, libraryDir:String, fonts:Array<String>, callb:nanofl.engine.libraryitems.LibraryItem -> Void) : Void;
}