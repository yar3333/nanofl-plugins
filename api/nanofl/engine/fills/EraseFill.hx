package nanofl.engine.fills;

extern class EraseFill extends nanofl.engine.fills.BaseFill implements nanofl.engine.fills.IFill
{
	function new() : Void;
	function save(out:htmlparser.XmlBuilder) : Void;
	function clone() : nanofl.engine.fills.EraseFill;
	function applyAlpha(alpha:Float) : Void;
	function getTyped() : nanofl.engine.fills.TypedFill;
	function begin(g:nanofl.engine.Render) : Void;
	function equ(e:nanofl.engine.fills.IFill) : Bool;
	function swapInstance(oldNamePath:String, newNamePath:String) : Void;
	function getTransformed(m:nanofl.engine.geom.Matrix) : nanofl.engine.fills.IFill;
	function toString() : String;
}