package nanofl.ide.plugins;

extern interface IExporterPlugin
{
	/**
	 * Internal name (for example: "FlashExporter", "SvgExporter").
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
	 * Custom properties for tune by user. Can be null or empty array if you have no customizable parameters.
	 */
	var properties : Array<nanofl.engine.CustomProperty>;
	/**
	 * This method must export document.
	 * @param	fileApi				Use this object to work with file system.
	 * @param	params				Custom parameters specified by user (produced from `properties`).
	 * @param	srcFilePath			Path to `*.nfl` file.
	 * @param	destFilePath		Path to supported file (one of the `fileFilterExtensions`).
	 * @param	documentProperties	Properties of the document.
	 * @param	library				Document's library.
	 * @return	Success flag.
	 */
	function exportDocument(fileApi:nanofl.engine.FileApi, params:Dynamic, srcFilePath:String, destFilePath:String, documentProperties:nanofl.engine.DocumentProperties, library:nanofl.engine.Library) : Bool;
}