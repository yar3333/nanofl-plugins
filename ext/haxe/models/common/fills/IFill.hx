package models.common.fills;

extern interface IFill
{
	function begin(g:createjs.Graphics) : Void;
	function clone() : models.common.fills.IFill;
	function equ(e:models.common.fills.IFill) : Bool;
	function save(out:models.common.XmlWriter) : Void;
	function swapInstance(oldNamePath:String, newNamePath:String) : Void;
	function setLibrary(library:models.common.Library) : Void;
	function toString() : String;
}