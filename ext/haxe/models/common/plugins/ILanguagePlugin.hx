package models.common.plugins;

extern interface ILanguagePlugin
{
	/**
	 * Code language name (for example: "JavaScript", "TypeScript", "Haxe").
	 * This value displayed to users & used as internal language ID.
	 */
	var name : String;
	/**
	 * Called to generate source code files (usually, base classes for symbols used in code)
	 * and sealized library to load in application.
	 * "filePath" argument is a path to *.nfl file.
	 */
	function generateFiles(fileApi:models.common.FileApi, filePath:String, documentProperties:models.common.DocumentProperties, library:models.common.Library) : Void;
}