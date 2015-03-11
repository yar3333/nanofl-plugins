package nanofl.ide.plugins;

extern interface IDocumentImporterPlugin
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
	 * If this function is not supported, method will not be called (isImportDocumentSupported must be false).
	 */
	function importDocument(fileApi:nanofl.engine.FileApi, srcFilePath:String, destFilePath:String, documentProperties:nanofl.engine.DocumentProperties, library:nanofl.engine.Library, fonts:Array<String>, callb:Bool -> Void) : Void;
}