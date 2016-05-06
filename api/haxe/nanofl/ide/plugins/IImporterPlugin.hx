package nanofl.ide.plugins;

extern interface IImporterPlugin
{
	/**
	 * Internal name (for example: "FlashImporter", "SvgImporter").
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
	/**
	 * Custom properties for tune by user. Can be null or empty array if there are no customizable parameters.
	 */
	var properties : Array<nanofl.engine.CustomProperty>;
	/**
	 * This method must import document.
	 * @param	api					Use this object to access to system functions.
	 * @param	params				Custom parameters specified by user (produced from `properties`).
	 * @param	srcFilePath			Path to supported file (one of the `fileFilterExtensions`).
	 * @param	destFilePath		Path to `*.nfl` file.
	 * @param	documentProperties	Properties of the document.
	 * @param	library				Document's library.
	 * @param	callb				Call this after importing with a success bool flag.
	 */
	function importDocument(api:nanofl.ide.NanoApi, params:Dynamic, srcFilePath:String, destFilePath:String, documentProperties:nanofl.ide.DocumentProperties, library:nanofl.engine.Library, callb:Bool -> Void) : Void;
}