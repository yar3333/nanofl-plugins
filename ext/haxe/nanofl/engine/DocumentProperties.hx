package nanofl.engine;

extern class DocumentProperties
{
	function new(?title:String, ?width:Int, ?height:Int, ?backgroundColor:String, ?framerate:Float, ?scaleMode:String, ?generatorName:String, ?generatorParams:Dynamic, ?useTextureAtlases:Bool, ?textureAtlases:Map<String, { var width : Int; var padding : Int; var height : Int; }>) : Void;
	var title : String;
	var width : Int;
	var height : Int;
	var backgroundColor : String;
	var framerate : Float;
	var scaleMode : String;
	var generatorName : String;
	var generatorParams : Dynamic;
	var useTextureAtlases : Bool;
	var textureAtlases : Map<String, { var width : Int; var padding : Int; var height : Int; }>;
	function save(fileApi:nanofl.engine.FileApi, filePath:String) : Void;
	function getGeneratorAsString() : String;
	static function load(filePath:String, fileApi:nanofl.engine.FileApi) : nanofl.engine.DocumentProperties;
	static function parseGenerator(s:String) : { var name : String; var params : Dynamic; };
	static function newTextureAtlasParams() : nanofl.ide.textureatlas.TextureAtlasParams;
}