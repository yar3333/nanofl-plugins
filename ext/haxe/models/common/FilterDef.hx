package models.common;

extern class FilterDef
{
	function new(name:String, params:Dynamic) : Void;
	var name(default, null) : String;
	var params(default, never) : Dynamic;
	function save(out:models.common.XmlWriter) : Void;
	function equ(filter:models.common.FilterDef) : Bool;
	function clone() : models.common.FilterDef;
	function cloneTweened(t:Float, finish:models.common.FilterDef) : models.common.FilterDef;
	function getFilter() : createjs.Filter;
	function getLabel() : String;
	function getProperties() : Array<models.client.plugins.FilterProperty>;
	static function load(node:htmlparser.HtmlNodeElement) : models.common.FilterDef;
}