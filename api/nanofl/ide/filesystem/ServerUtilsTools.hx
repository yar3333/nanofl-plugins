package nanofl.ide.filesystem;

extern class ServerUtilsTools
{
	static function loadDocument(api:nanofl.ide.NanoApi, path:String, lastModified:Date) : { var lastModified : Date; var library : nanofl.ide.library.Library; var properties : nanofl.ide.DocumentProperties; };
	static function saveDocument(api:nanofl.ide.NanoApi, path:String, properties:nanofl.ide.DocumentProperties, library:nanofl.ide.library.Library, textureAtlases:Map<String, nanofl.ide.textureatlas.TextureAtlas>, fileActions:Array<nanofl.ide.filesystem.FileAction>) : { var generatorError : String; var lastModified : Date; };
	static function publishDocument(api:nanofl.ide.NanoApi, path:String, originalProperties:nanofl.ide.DocumentProperties, originalLibrary:nanofl.ide.library.Library, textureAtlases:Map<String, nanofl.ide.textureatlas.TextureAtlas>) : { var message : String; var success : Bool; };
	static function copyLibraryFiles(fileSystem:nanofl.engine.FileSystem, srcLibraryDir:String, relativePaths:Array<String>, destLibraryDir:String) : Void;
	static function renameFiles(fileSystem:nanofl.engine.FileSystem, files:Array<{ var src : String; var dest : String; }>) : Void;
	static function remove(fileSystem:nanofl.engine.FileSystem, paths:Array<String>) : Void;
	static function loadFilesFromClipboard(fileSystem:nanofl.engine.FileSystem, destDir:String) : Bool;
	static function saveFilesIntoClipboard(fileSystem:nanofl.engine.FileSystem, baseDir:String, relativePaths:Array<String>) : Void;
	static function loadCodeFile(fileSystem:nanofl.engine.FileSystem, path:String) : { var text : String; };
	static function saveCodeFile(fileSystem:nanofl.engine.FileSystem, path:String, text:String) : Void;
}