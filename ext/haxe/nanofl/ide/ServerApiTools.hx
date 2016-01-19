package nanofl.ide;

extern class ServerApiTools
{
	static function loadDocument(api:nanofl.ide.plugins.PluginApi, path:String, lastModified:Date) : { var lastModified : Date; var library : nanofl.engine.Library; var properties : nanofl.engine.DocumentProperties; };
	static function saveDocument(api:nanofl.ide.plugins.PluginApi, path:String, properties:nanofl.engine.DocumentProperties, library:nanofl.engine.Library, textureAtlases:Map<String, nanofl.ide.textureatlas.TextureAtlas>, fileActions:Array<nanofl.ide.FileAction>) : { var generatorError : String; var lastModified : Date; };
	static function publishDocument(api:nanofl.ide.plugins.PluginApi, path:String, originalProperties:nanofl.engine.DocumentProperties, originalLibrary:nanofl.engine.Library, textureAtlases:Map<String, nanofl.ide.textureatlas.TextureAtlas>) : { var message : String; var success : Bool; };
	static function copyLibraryFiles(fileApi:nanofl.engine.FileApi, srcLibraryDir:String, relativePaths:Array<String>, destLibraryDir:String) : Void;
	static function renameFiles(fileApi:nanofl.engine.FileApi, files:Array<{ var src : String; var dest : String; }>) : Void;
	static function remove(fileApi:nanofl.engine.FileApi, paths:Array<String>) : Void;
	static function loadFilesFromClipboard(fileApi:nanofl.engine.FileApi, destDir:String) : Bool;
	static function saveFilesIntoClipboard(fileApi:nanofl.engine.FileApi, baseDir:String, relativePaths:Array<String>) : Void;
}