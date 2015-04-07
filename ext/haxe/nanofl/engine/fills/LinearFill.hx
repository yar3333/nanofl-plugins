package nanofl.engine.fills;

extern class LinearFill extends nanofl.engine.fills.BaseFill implements nanofl.engine.fills.IFill
{
	function new(colors:Array<String>, ratios:Array<Float>, x0:Float, y0:Float, x1:Float, y1:Float) : Void;
	var colors : Array<String>;
	var ratios : Array<Float>;
	var x0 : Float;
	var y0 : Float;
	var x1 : Float;
	var y1 : Float;
	function save(out:nanofl.engine.XmlWriter) : Void;
	function clone() : nanofl.engine.fills.IFill;
	function applyAlpha(alpha:Float) : Void;
	function begin(g:createjs.Graphics) : Void;
	function equ(e:nanofl.engine.fills.IFill) : Bool;
	function swapInstance(oldNamePath:String, newNamePath:String) : Void;
	function getTransformed(m:nanofl.engine.geom.Matrix) : nanofl.engine.fills.IFill;
	function toString() : String;
	static function load(node:htmlparser.HtmlNodeElement) : nanofl.engine.fills.LinearFill;
}