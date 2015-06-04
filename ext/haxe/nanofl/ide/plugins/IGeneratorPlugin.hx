package nanofl.ide.plugins;

extern interface IGeneratorPlugin
{
	/**
	 * In regular case this is a game engine name ("CreateJS", "Phaser3").
	 * This value displayed to users & used as internal ID.
	 */
	var name : String;
	/**
	 * In regular case this is a language name ("HTML", "JavaScript", "TypeScript", "Haxe", "C#", "C++").
	 * Must be null or empty array if no modes supported.
	 */
	var modes : Array<String>;
	/**
	 * Called to generate source code files (usually, base classes for symbols used in code)
	 * and sealized library to load in application.
	 * "filePath" argument is a path to *.nfl file.
	 */
	function generateFiles(mode:String, fileApi:nanofl.engine.FileApi, filePath:String, documentProperties:nanofl.engine.DocumentProperties, library:nanofl.engine.Library, textureAtlases:Map<String, nanofl.ide.textureatlas.TextureAtlas>) : Void;
}