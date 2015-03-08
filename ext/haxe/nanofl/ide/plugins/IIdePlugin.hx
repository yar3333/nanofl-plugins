package nanofl.ide.plugins;

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
	function generateFiles(language:String, fileApi:nanofl.engine.FileApi, filePath:String, documentProperties:nanofl.engine.DocumentProperties, library:nanofl.engine.Library) : Void;
}