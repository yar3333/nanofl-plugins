package nanofl.engine;

extern class FilterDef
{
	function new(name:String, params:Dynamic) : Void;
	var name(default, null) : String;
	var params(default, never) : Dynamic;
	function save(out:nanofl.engine.XmlWriter) : Void;
	function equ(filter:nanofl.engine.FilterDef) : Bool;
	function clone() : nanofl.engine.FilterDef;
	function cloneTweened(t:Float, finish:nanofl.engine.FilterDef) : nanofl.engine.FilterDef;
	function getFilter() : createjs.Filter;
	function getLabel() : String;
	function getProperties() : Array<nanofl.engine.plugins.FilterProperty>;
	static function load(node:htmlparser.HtmlNodeElement) : nanofl.engine.FilterDef;
}