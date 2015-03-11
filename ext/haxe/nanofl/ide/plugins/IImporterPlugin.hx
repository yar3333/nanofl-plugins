package nanofl.ide.plugins;

extern interface IImporterPlugin
{
	/**
	 * Internal name (for example: "XflImporter", "SvgImporter").
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
	 * Like [ "fla", "xfl" ].
	 */
	var fileFilterExtensions : Array<String>;
	function importDocument(fileApi:nanofl.engine.FileApi, srcFilePath:String, destFilePath:String, documentProperties:nanofl.engine.DocumentProperties, library:nanofl.engine.Library, fonts:Array<String>, callb:Bool -> Void) : Void;
}