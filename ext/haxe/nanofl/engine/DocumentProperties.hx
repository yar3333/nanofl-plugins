package nanofl.engine;

extern class DocumentProperties
{
	function new(?title:String, ?width:Int, ?height:Int, ?backgroundColor:String, ?framerate:Float, ?language:String, ?ide:String) : Void;
	var title : String;
	var width : Int;
	var height : Int;
	var backgroundColor : String;
	var framerate : Float;
	var language : String;
	var ide : String;
	function save(fileApi:nanofl.engine.FileApi, filePath:String) : Void;
	static function load(filePath:String, fileApi:nanofl.engine.FileApi) : nanofl.engine.DocumentProperties;
}