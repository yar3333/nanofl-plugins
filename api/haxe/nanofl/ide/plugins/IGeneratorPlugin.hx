package nanofl.ide.plugins;

extern interface IGeneratorPlugin
{
	/**
	 * In regular case this is a game engine name ("CreateJS", "Phaser3").
	 * This value displayed to users & used as internal ID.
	 */
	var name : String;
	/**
	 * Custom properties for tune by user. Can be null or empty array if there are no customizable parameters.
	 */
	var properties : Array<nanofl.engine.CustomProperty>;
	/**
	 * Called to generate files (usually, base classes for symbols and serialized library to load in the user application).
	 * @param	api					Use this object to access to system functions.
	 * @param	params				Custom parameters specified by user (produced from `properties`).
	 * @param	filePath			Path to `*.nfl` file.
	 * @param	documentProperties	Properties of the document.
	 * @param	library				Document's library.
	 * @param	textureAtlases		Generated texture atlases.
	 * @return	Paths to files to publish. Must be relative to the the document's root directory.
	 */
	function generate(api:nanofl.ide.NanoApi, params:Dynamic, filePath:String, documentProperties:nanofl.ide.DocumentProperties, library:nanofl.engine.Library, textureAtlases:Map<String, nanofl.ide.textureatlas.TextureAtlas>) : Array<String>;
	/**
	 * Called to "run" saved document. Must return error message or null if no errors.
	 * Use this method if you need direct access to file system and OS.
	 * @param	api			Use this object to access to system functions.
	 * @param	params		Custom parameters specified by user (produced from `properties`).
	 * @param	filePath	Path to `*.nfl` file.
	 */
	function test(api:nanofl.ide.NanoApi, params:Dynamic, filePath:String) : String;
	/**
	 * Must return relative path to code file, linked to symbol.
	 * If `symbol.linkedClass` is empty then this method must fill it with correct default value.
	 * If `symbol.linkedClass` contain incorrect value, this method can fix it.
	 * Method must return `null` if no code file is supported.
	 */
	function getCodeFilePath(params:Dynamic, symbol:nanofl.engine.libraryitems.InstancableItem) : String;
}