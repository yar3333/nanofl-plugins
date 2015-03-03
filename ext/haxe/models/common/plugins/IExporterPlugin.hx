package models.common.plugins;

extern interface IExporterPlugin
{
	/**
	 * Compiler name (for example: "JavaScript", "TypeScript", "Haxe").
	 */
	var name : String;
	var menuItemName : String;
	var menuItemIcon : String;
	var fileFilterDescription : String;
	var fileFilterPattern : String;
	var fileDefaultExtension : String;
	function exportDocument(fileApi:models.common.FileApi, srcFilePath:String, destFilePath:String, documentProperties:models.common.DocumentProperties, library:models.common.Library) : Void;
}