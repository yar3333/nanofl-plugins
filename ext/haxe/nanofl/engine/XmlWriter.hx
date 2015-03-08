package nanofl.engine;

extern class XmlWriter
{
	function new() : Void;
	function begin(tag:String, ?attrs:Array<{ var value : Dynamic; var name : String; }>) : nanofl.engine.XmlWriter;
	function end() : nanofl.engine.XmlWriter;
	function attr(name:String, value:Dynamic, ?defValue:Dynamic) : nanofl.engine.XmlWriter;
	function content(s:String) : nanofl.engine.XmlWriter;
	function toString() : String;
}