package nanofl.ide.plugins;

extern interface IExporterPlugin
{
	/**
	 * Compiler name (for example: "JavaScript", "TypeScript", "Haxe").
	 */
	var name : String;
	var menuItemName : String;
	var menuItemIcon : String;
	var fileFilterDescription : String;
	var fileFilterExtensions : Array<String>;
	var fileDefaultExtension : String;
	function exportDocument(fileApi:nanofl.engine.FileApi, srcFilePath:String, destFilePath:String, documentProperties:nanofl.engine.DocumentProperties, library:nanofl.engine.Library) : Bool;
}