package models.common.fills;

extern class SolidFill extends models.common.fills.BaseFill implements models.common.fills.IFill
{
	function new(color:String) : Void;
	var color : String;
	function save(out:models.common.XmlWriter) : Void;
	function clone() : models.common.fills.IFill;
	function applyAlpha(alpha:Float) : Void;
	function getTransformed(m:models.common.geom.Matrix) : models.common.fills.IFill;
	function begin(g:createjs.Graphics) : Void;
	function equ(e:models.common.fills.IFill) : Bool;
	function swapInstance(oldNamePath:String, newNamePath:String) : Void;
	function toString() : String;
	static function load(node:htmlparser.HtmlNodeElement) : models.common.fills.SolidFill;
}