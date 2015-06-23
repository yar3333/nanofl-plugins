package nanofl.ide.plugins;

extern interface IExporterPlugin
{
	/**
	 * Internal name (for example: "XflExporter", "SvgExporter").
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
	function exportDocument(fileApi:nanofl.engine.FileApi, srcFilePath:String, destFilePath:String, documentProperties:nanofl.engine.DocumentProperties, library:nanofl.engine.Library) : Bool;
}