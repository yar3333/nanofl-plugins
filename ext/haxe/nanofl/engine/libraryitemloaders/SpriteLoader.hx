package nanofl.engine.libraryitemloaders;

extern class SpriteLoader extends nanofl.engine.libraryitemloaders.BaseLoader
{
	function new(libraryDir:String, fileApi:nanofl.engine.FileApi, xmlFileCache:Map<String, htmlparser.XmlDocument>, jsonFileCache:Map<String, Dynamic>) : Void;
	override function load(files:Array<String>) : Array<nanofl.engine.libraryitems.LibraryItem>;
}