package models.common.strokes;

extern interface IStroke
{
	function begin(g:createjs.Graphics) : Void;
	function clone() : models.common.strokes.IStroke;
	function getSize() : Float;
	function equ(e:models.common.strokes.IStroke) : Bool;
	function save(out:models.common.XmlWriter) : Void;
	function swapInstance(oldNamePath:String, newNamePath:String) : Void;
	function applyAlpha(alpha:Float) : Void;
	function setLibrary(library:models.common.Library) : Void;
	function toString() : String;
}