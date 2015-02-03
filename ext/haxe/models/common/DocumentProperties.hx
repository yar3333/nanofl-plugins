package models.common;

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
	function save(fileApi:models.common.FileApi, filePath:String) : Void;
	static function load(filePath:String, fileApi:models.common.FileApi) : models.common.DocumentProperties;
}