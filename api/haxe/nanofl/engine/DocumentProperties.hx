package nanofl.engine;

extern class DocumentProperties
{
	function new(?title:String, ?width:Int, ?height:Int, ?backgroundColor:String, ?framerate:Float, ?scaleMode:String, ?generator:nanofl.ide.Generator, ?useTextureAtlases:Bool, ?textureAtlases:Map<String, nanofl.ide.textureatlas.TextureAtlasParams>, ?publishSettings:Array<nanofl.ide.plugins.PublishSetting>) : Void;
	var title : String;
	var width : Int;
	var height : Int;
	var backgroundColor : String;
	var framerate : Float;
	var scaleMode : String;
	var generator : nanofl.ide.Generator;
	var useTextureAtlases : Bool;
	var textureAtlases : Map<String, nanofl.ide.textureatlas.TextureAtlasParams>;
	var publishSettings : Array<nanofl.ide.plugins.PublishSetting>;
	function save(fileSystem:nanofl.engine.FileSystem, filePath:String) : Void;
	function equ(p:nanofl.engine.DocumentProperties) : Bool;
	function clone() : nanofl.engine.DocumentProperties;
	function getOptimized(optimizations:nanofl.ide.PublishOptimizations) : nanofl.engine.DocumentProperties;
	static function load(filePath:String, fileSystem:nanofl.engine.FileSystem) : nanofl.engine.DocumentProperties;
}