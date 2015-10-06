package nanofl.engine;

extern class FilterDef
{
	function new(name:String, params:Dynamic) : Void;
	var name(default, null) : String;
	var params(default, never) : Dynamic;
	function save(out:htmlparser.XmlBuilder) : Void;
	function equ(filter:nanofl.engine.FilterDef) : Bool;
	function clone() : nanofl.engine.FilterDef;
	function tween(t:Float, finish:nanofl.engine.FilterDef) : nanofl.engine.FilterDef;
	function getFilter() : createjs.Filter;
	function getLabel() : String;
	function getProperties() : Array<nanofl.engine.CustomProperty>;
	function resetToNeutral() : nanofl.engine.FilterDef;
	static function load(node:htmlparser.HtmlNodeElement, version:String) : nanofl.engine.FilterDef;
}