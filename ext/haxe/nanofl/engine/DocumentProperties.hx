package nanofl.engine;

extern class DocumentProperties
{
	function new(?title:String, ?width:Int, ?height:Int, ?backgroundColor:String, ?framerate:Float, ?generator:String, ?generatorMode:String, ?useTextureAtlases:Bool, ?textureAtlasWidth:Int, ?textureAtlasHeight:Int, ?textureAtlasPadding:Int, ?graphicsAcceleration:Bool) : Void;
	var title : String;
	var width : Int;
	var height : Int;
	var backgroundColor : String;
	var framerate : Float;
	var generator : String;
	var generatorMode : String;
	var useTextureAtlases : Bool;
	var textureAtlasWidth : Int;
	var textureAtlasHeight : Int;
	var textureAtlasPadding : Int;
	var graphicsAcceleration : Bool;
	function save(fileApi:nanofl.engine.FileApi, filePath:String) : Void;
	static function load(filePath:String, fileApi:nanofl.engine.FileApi) : nanofl.engine.DocumentProperties;
}