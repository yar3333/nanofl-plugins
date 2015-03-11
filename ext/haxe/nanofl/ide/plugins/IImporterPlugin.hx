package nanofl.ide.plugins;

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
	function importDocument(fileApi:nanofl.engine.FileApi, srcFilePath:String, destFilePath:String, documentProperties:nanofl.engine.DocumentProperties, library:nanofl.engine.Library, fonts:Array<String>, callb:Bool -> Void) : Void;
}