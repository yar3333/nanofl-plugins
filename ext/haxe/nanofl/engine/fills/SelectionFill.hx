package nanofl.engine.fills;

extern class SelectionFill extends nanofl.engine.fills.BaseFill implements nanofl.engine.fills.IFill
{
	function new(scale:Float) : Void;
	function save(out:htmlparser.XmlBuilder) : Void;
	function clone() : nanofl.engine.fills.IFill;
	function applyAlpha(alpha:Float) : Void;
	function getTransformed(m:nanofl.engine.geom.Matrix) : nanofl.engine.fills.IFill;
	function begin(g:nanofl.engine.Render) : Void;
	function equ(e:nanofl.engine.fills.IFill) : Bool;
	function swapInstance(oldNamePath:String, newNamePath:String) : Void;
	function toString() : String;
}