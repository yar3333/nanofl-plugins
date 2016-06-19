package nanofl.engine.libraryitems;

extern class LibraryItem
{
	var namePath(default, null) : String;
	function getType() : String;
	function getIcon() : String;
	function clone() : nanofl.engine.libraryitems.LibraryItem;
	function loadProperties(xml:htmlparser.HtmlNodeElement) : Void;
	function save(fileSystem:nanofl.engine.FileSystem) : Void;
	function saveToXml(out:htmlparser.XmlBuilder) : Void;
	function getFilePathToRunWithEditor() : String;
	function getLibraryFilePaths() : Array<String>;
	function getOptimized(settings:nanofl.ide.publishing.PublishSettings) : nanofl.engine.libraryitems.LibraryItem;
	function generateOptimizedFiles(fileSystem:nanofl.engine.FileSystem, settings:nanofl.ide.publishing.PublishSettings, destDir:String) : Array<{ var relPath : String; var baseDir : String; }>;
	function preload(ready:Void -> Void) : Void;
	function duplicate(newNamePath:String) : nanofl.engine.libraryitems.LibraryItem;
	function remove() : Void;
	function equ(item:nanofl.engine.libraryitems.LibraryItem) : Bool;
	function toString() : String;
	static function parse(namePath:String, itemNode:htmlparser.HtmlNodeElement) : nanofl.engine.libraryitems.LibraryItem;
}