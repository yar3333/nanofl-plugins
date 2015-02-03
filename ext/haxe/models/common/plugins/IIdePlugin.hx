package models.common.plugins;

extern interface IIdePlugin
{
	/**
	 * IDE name (for example: "FlashDevelop", "MS Visual Studio 2013").
	 */
	var name : String;
	/**
	 * Supported languages (for example: [ "JavaScript", "TypeScript", "Haxe" ]).
	 */
	var languages : Array<String>;
	/**
	 * Called to generate IDE-related files (solution/project).
	 * "fileApi" argument is a path to *.nfl file.
	 */
	function generateFiles(language:String, fileApi:models.common.FileApi, filePath:String, documentProperties:models.common.DocumentProperties, library:models.common.Library) : Void;
}