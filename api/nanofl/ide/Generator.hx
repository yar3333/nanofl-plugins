package nanofl.ide;

extern class Generator
{
	function new(?name:String, ?params:Dynamic) : Void;
	var name : String;
	var params : Dynamic;
	function equ(g:nanofl.ide.Generator) : Bool;
	function clone() : nanofl.ide.Generator;
	function toString() : String;
	static function fromString(s:String) : nanofl.ide.Generator;
}