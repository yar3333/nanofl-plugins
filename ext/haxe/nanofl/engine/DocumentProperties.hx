package nanofl.engine;

extern class DocumentProperties
{
	function new(?title:String, ?width:Int, ?height:Int, ?backgroundColor:String, ?framerate:Float, ?engine:String, ?language:String, ?ide:String, ?useTextureAtlases:Bool, ?graphicsAcceleration:Bool) : Void;
	var title : String;
	var width : Int;
	var height : Int;
	var backgroundColor : String;
	var framerate : Float;
	var engine : String;
	var language : String;
	var ide : String;
	var useTextureAtlases : Bool;
	var graphicsAcceleration : Bool;
	function save(fileApi:nanofl.engine.FileApi, filePath:String) : Void;
	static function load(filePath:String, fileApi:nanofl.engine.FileApi) : nanofl.engine.DocumentProperties;
}