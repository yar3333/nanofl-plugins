package nanofl.engine.fills;

extern class SolidFill extends nanofl.engine.fills.BaseFill implements nanofl.engine.fills.IFill
{
	function new(color:String) : Void;
	var color : String;
	function save(out:nanofl.engine.XmlWriter) : Void;
	function clone() : nanofl.engine.fills.IFill;
	function applyAlpha(alpha:Float) : Void;
	function getTransformed(m:nanofl.engine.geom.Matrix) : nanofl.engine.fills.IFill;
	function begin(g:nanofl.engine.Render) : Void;
	function equ(e:nanofl.engine.fills.IFill) : Bool;
	function swapInstance(oldNamePath:String, newNamePath:String) : Void;
	function toString() : String;
	static function load(node:htmlparser.HtmlNodeElement) : nanofl.engine.fills.SolidFill;
}