package models.common.strokes;

extern class SelectionStroke extends models.common.strokes.BaseStroke implements models.common.strokes.IStroke
{
	function new(base:models.common.strokes.BaseStroke, m:createjs.Matrix2D) : Void;
	function save(out:models.common.XmlWriter) : Void;
	function begin(g:createjs.Graphics) : Void;
	function swapInstance(oldNamePath:String, newNamePath:String) : Void;
	function toString() : String;
}