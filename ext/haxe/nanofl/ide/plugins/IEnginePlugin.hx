package nanofl.ide.plugins;

extern interface IEnginePlugin
{
	/**
	 * Game engine name (for example: "CreateJS", "Phaser3").
	 * This value displayed to users & used as internal ID.
	 */
	var name : String;
	/**
	 * Supported languages ("HTML", "JavaScript", "TypeScript", "Haxe", "C#", "C++").
	 */
	var languages : Array<String>;
	/**
	 * Called to generate source code files (usually, base classes for symbols used in code)
	 * and sealized library to load in application.
	 * "filePath" argument is a path to *.nfl file.
	 */
	function generateFiles(language:String, fileApi:nanofl.engine.FileApi, filePath:String, documentProperties:nanofl.engine.DocumentProperties, library:nanofl.engine.Library) : Void;
}