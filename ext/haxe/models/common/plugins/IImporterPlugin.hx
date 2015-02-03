package models.common.plugins;

extern interface IImporterPlugin
{
	/**
	 * Compiler name (for example: "JavaScript", "TypeScript", "Haxe").
	 */
	var name : String;
	var menuItemName : String;
	var fileFilterDescription : String;
	var fileFilterPattern : String;
	function importDocument(fileApi:models.common.FileApi, srcFilePath:String, destFilePath:String, documentProperties:models.common.DocumentProperties, library:models.common.Library, callb:Bool -> Void) : Void;
}