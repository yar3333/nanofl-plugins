package models.common.plugins;

extern interface IImporterPlugin
{
	/**
	 * Compiler name (for example: "JavaScript", "TypeScript", "Haxe").
	 */
	var name : String;
	var menuItemName : String;
	var menuItemIcon : String;
	var fileFilterDescription : String;
	var fileFilterExtensions : Array<String>;
	function importDocument(fileApi:models.common.FileApi, srcFilePath:String, destFilePath:String, documentProperties:models.common.DocumentProperties, library:models.common.Library, fonts:Array<String>, callb:Bool -> Void) : Void;
}