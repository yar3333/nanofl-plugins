package nanofl.ide.plugins;

extern interface ILoaderPlugin
{
	/**
	 * Internal name (for example: "Blender3DLoader", "CreateJSTextureAtlasLoader").
	 */
	var name : String;
	/**
	 * Used to determine the order of your plugin in load queue.
	 * Use 0 if you want load() called at the end (if you load simple files).
	 * Use 1000 if you want load() called at the begin (if your loader is complex).
	 */
	var priority : Int;
	/**
	 * Method must detect loadable files and returns created LibraryItems.
	 * Successfully processed files must be marked with exclude() to prevent loading them by other loaders.
	 */
	function load(files:Map<String, nanofl.ide.CachedFile>) : Array<nanofl.engine.libraryitems.LibraryItem>;
}