package models.common.fills;

extern class SelectionFill extends models.common.fills.BaseFill implements models.common.fills.IFill
{
	function new(m:createjs.Matrix2D) : Void;
	function save(out:models.common.XmlWriter) : Void;
	function clone() : models.common.fills.IFill;
	function begin(g:createjs.Graphics) : Void;
	function transform(m:models.common.geom.Matrix) : Void;
	function equ(e:models.common.fills.IFill) : Bool;
	function translate(dx:Float, dy:Float) : Void;
	function swapInstance(oldNamePath:String, newNamePath:String) : Void;
	function toString() : String;
}