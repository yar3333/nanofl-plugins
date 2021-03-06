package nanofl.engine.fills;

extern interface IFill
{
	function begin(g:nanofl.engine.Render) : Void;
	function clone() : nanofl.engine.fills.IFill;
	function equ(e:nanofl.engine.fills.IFill) : Bool;
	function applyAlpha(alpha:Float) : Void;
	function getTransformed(m:nanofl.engine.geom.Matrix) : nanofl.engine.fills.IFill;
	function save(out:htmlparser.XmlBuilder) : Void;
	function swapInstance(oldNamePath:String, newNamePath:String) : Void;
	function setLibrary(library:nanofl.engine.Library) : Void;
	function toString() : String;
}