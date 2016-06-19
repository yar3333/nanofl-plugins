package nanofl.ide;

extern class DocumentProperties
{
	function new(?title:String, ?width:Int, ?height:Int, ?backgroundColor:String, ?framerate:Float, ?scaleMode:String, ?useTextureAtlases:Bool, ?textureAtlases:Map<String, nanofl.ide.textureatlas.TextureAtlasParams>, ?generateFlashDevelopProject:Bool, ?publishSettings:nanofl.ide.publishing.PublishSettings) : Void;
	var title : String;
	var width : Int;
	var height : Int;
	var backgroundColor : String;
	var framerate : Float;
	var scaleMode : String;
	var useTextureAtlases : Bool;
	var textureAtlases : Map<String, nanofl.ide.textureatlas.TextureAtlasParams>;
	var generateFlashDevelopProject : Bool;
	var publishSettings : nanofl.ide.publishing.PublishSettings;
	function save(fileSystem:nanofl.engine.FileSystem, filePath:String) : Void;
	function equ(p:nanofl.ide.DocumentProperties) : Bool;
	function clone() : nanofl.ide.DocumentProperties;
	function getOptimized(settings:nanofl.ide.publishing.PublishSettings) : nanofl.ide.DocumentProperties;
	static function load(filePath:String, fileSystem:nanofl.engine.FileSystem) : nanofl.ide.DocumentProperties;
}