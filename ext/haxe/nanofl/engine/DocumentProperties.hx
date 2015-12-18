package nanofl.engine;

extern class DocumentProperties
{
	function new(?title:String, ?width:Int, ?height:Int, ?backgroundColor:String, ?framerate:Float, ?scaleMode:String, ?generatorName:String, ?generatorParams:Dynamic, ?useTextureAtlases:Bool, ?textureAtlases:Map<String, nanofl.ide.textureatlas.TextureAtlasParams>, ?publishSettings:Array<nanofl.ide.plugins.PublishSetting>) : Void;
	var title : String;
	var width : Int;
	var height : Int;
	var backgroundColor : String;
	var framerate : Float;
	var scaleMode : String;
	var generatorName : String;
	var generatorParams : Dynamic;
	var useTextureAtlases : Bool;
	var textureAtlases : Map<String, nanofl.ide.textureatlas.TextureAtlasParams>;
	var publishSettings : Array<nanofl.ide.plugins.PublishSetting>;
	function save(fileApi:nanofl.engine.FileApi, filePath:String) : Void;
	function getGeneratorAsString() : String;
	function equ(p:nanofl.engine.DocumentProperties) : Bool;
	function clone() : nanofl.engine.DocumentProperties;
	function getOptimized(optimizations:nanofl.ide.PublishOptimizations) : nanofl.engine.DocumentProperties;
	static function load(filePath:String, fileApi:nanofl.engine.FileApi) : nanofl.engine.DocumentProperties;
	static function parseGenerator(s:String) : { var name : String; var params : Dynamic; };
}