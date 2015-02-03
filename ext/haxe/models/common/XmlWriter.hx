package models.common;

extern class XmlWriter
{
	function new() : Void;
	function begin(tag:String, ?attrs:Array<{ var value : Dynamic; var name : String; }>) : models.common.XmlWriter;
	function end() : models.common.XmlWriter;
	function attr(name:String, value:Dynamic, ?defValue:Dynamic) : models.common.XmlWriter;
	function content(s:String) : models.common.XmlWriter;
	function toString() : String;
}