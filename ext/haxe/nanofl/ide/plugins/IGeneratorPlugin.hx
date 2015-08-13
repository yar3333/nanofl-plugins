package nanofl.ide.plugins;

extern interface IGeneratorPlugin
{
	/**
	 * In regular case this is a game engine name ("CreateJS", "Phaser3").
	 * This value displayed to users & used as internal ID.
	 */
	var name : String;
	/**
	 * Custom generator properties. Can be null (or empty array) if you have no customizable params.
	 */
	var properties : Array<nanofl.engine.CustomProperty>;
	/**
	 * Called to generate files (usually, base classes for symbols and serialized library to load in your application).
	 * @param	fileApi
	 * @param	filePath			Path to `*.nfl` file.
	 * @param	params				Custom parameters specified by user (produced from `properties`).
	 * @param	documentProperties
	 * @param	library
	 * @param	textureAtlases		Generated texture atlases.
	 */
	function generate(fileApi:nanofl.engine.FileApi, filePath:String, params:Dynamic, documentProperties:nanofl.engine.DocumentProperties, library:nanofl.engine.Library, textureAtlases:Map<String, nanofl.ide.textureatlas.TextureAtlas>) : Void;
}