package models.common.fills;

extern class RadialFill extends models.common.fills.MatrixFill implements models.common.fills.IFill
{
	function new(colors:Array<String>, ratios:Array<Float>, matrix:models.common.geom.Matrix) : Void;
	var colors : Array<String>;
	var ratios : Array<Float>;
	function save(out:models.common.XmlWriter) : Void;
	override function clone() : models.common.fills.IFill;
	function applyAlpha(alpha:Float) : Void;
	function begin(g:createjs.Graphics) : Void;
	function equ(e:models.common.fills.IFill) : Bool;
	function swapInstance(oldNamePath:String, newNamePath:String) : Void;
	function toString() : String;
	static function load(node:htmlparser.HtmlNodeElement) : models.common.fills.RadialFill;
}