package nanofl.ide.plugins;

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
	function generateFiles(fileApi:nanofl.engine.FileApi, filePath:String, documentProperties:nanofl.engine.DocumentProperties, library:nanofl.engine.Library) : Void;
}