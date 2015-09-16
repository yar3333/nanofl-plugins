package nanofl.ide.plugins;

extern interface IGeneratorPlugin
{
	/**
	 * In regular case this is a game engine name ("CreateJS", "Phaser3").
	 * This value displayed to users & used as internal ID.
	 */
	var name : String;
	/**
	 * Custom properties for tune by user. Can be null or empty array if you have no customizable parameters.
	 */
	var properties : Array<nanofl.engine.CustomProperty>;
	/**
	 * Called to generate files (usually, base classes for symbols and serialized library to load in the user application).
	 * @param	fileApi				Use this object to work with file system.
	 * @param	params				Custom parameters specified by user (produced from `properties`).
	 * @param	filePath			Path to `*.nfl` file.
	 * @param	documentProperties	Properties of the document.
	 * @param	library				Document's library.
	 * @param	textureAtlases		Generated texture atlases.
	 */
	function generate(fileApi:nanofl.engine.FileApi, params:Dynamic, filePath:String, documentProperties:nanofl.engine.DocumentProperties, library:nanofl.engine.Library, textureAtlases:Map<String, nanofl.ide.textureatlas.TextureAtlas>) : Void;
	/**
	 * called to "run" saved document. Must return error message or null if no errors.
	 * Use this method if you need direct access to file system and OS.
	 * @param	serverApi	Use this object to open URLs in embedded web server.
	 * @param	fileApi		Use this object to work with file system.
	 * @param	params		Custom parameters specified by user (produced from `properties`).
	 * @param	filePath	Path to `*.nfl` file.
	 */
	function test(serverApi:nanofl.ide.ServerApi, fileApi:nanofl.engine.FileApi, params:Dynamic, filePath:String) : String;
}