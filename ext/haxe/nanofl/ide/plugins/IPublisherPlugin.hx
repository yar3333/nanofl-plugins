package nanofl.ide.plugins;

extern interface IPublisherPlugin
{
	/**
	 * Internal name (for example: "IntelXDEPublisher", "ApacheCordovaPublisher").
	 */
	var name : String;
	/**
	 * Human name ("Intel XDE", "Apache Cordova").
	 */
	var menuItemName : String;
	/**
	 * Css class or image url in "url(pathToImage)" format.
	 */
	var menuItemIcon : String;
	/**
	 * Custom properties for tune by user. Can be null or empty array if there are no customizable parameters.
	 */
	var properties : Array<nanofl.engine.CustomProperty>;
	/**
	 * This method must publish document.
	 * @param	api			Use this object to access to system functions.
	 * @param	params		Custom parameters specified by user (produced from `properties`).
	 * @param	filePath	Path to `*.nfl` file.
	 * @param	files		Files to publish.
	 */
	function publish(api:nanofl.ide.plugins.PluginApi, params:Dynamic, filePath:String, documentProperties:nanofl.engine.DocumentProperties, library:nanofl.engine.Library, files:Array<{ var relPath : String; var baseDir : String; }>) : Void;
}