package nanofl.engine.fills;

extern class RadialFill extends nanofl.engine.fills.MatrixFill implements nanofl.engine.fills.IFill
{
	function new(colors:Array<String>, ratios:Array<Float>, matrix:nanofl.engine.geom.Matrix) : Void;
	var colors : Array<String>;
	var ratios : Array<Float>;
	function save(out:nanofl.engine.XmlWriter) : Void;
	override function clone() : nanofl.engine.fills.IFill;
	function applyAlpha(alpha:Float) : Void;
	function begin(g:createjs.Graphics) : Void;
	function equ(e:nanofl.engine.fills.IFill) : Bool;
	function swapInstance(oldNamePath:String, newNamePath:String) : Void;
	function toString() : String;
	static function load(node:htmlparser.HtmlNodeElement) : nanofl.engine.fills.RadialFill;
}