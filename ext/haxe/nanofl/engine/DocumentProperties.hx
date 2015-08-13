package nanofl.engine;

extern class DocumentProperties
{
	function new(?title:String, ?width:Int, ?height:Int, ?backgroundColor:String, ?framerate:Float, ?scaleMode:String, ?generator:{ var params : Dynamic; var name : String; }, ?textureAtlases:{ var width : Int; var use : Bool; var padding : Int; var height : Int; }) : Void;
	var title : String;
	var width : Int;
	var height : Int;
	var backgroundColor : String;
	var framerate : Float;
	var scaleMode : String;
	var generator : { var name : String; var params : Dynamic; };
	var textureAtlases : { var height : Int; var padding : Int; var use : Bool; var width : Int; };
	function save(fileApi:nanofl.engine.FileApi, filePath:String) : Void;
	static function load(filePath:String, fileApi:nanofl.engine.FileApi) : nanofl.engine.DocumentProperties;
	static function parseGenerator(s:String) : { var name : String; var params : Dynamic; };
	static function generatorToString(generator:{ var name : String; var params : Dynamic; }) : String;
}