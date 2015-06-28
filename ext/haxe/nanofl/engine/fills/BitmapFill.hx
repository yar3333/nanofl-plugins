package nanofl.engine.fills;

extern class BitmapFill extends nanofl.engine.fills.BaseFill implements nanofl.engine.fills.IFill
{
	function new(bitmapPath:String, repeat:String, matrix:nanofl.engine.geom.Matrix) : Void;
	var bitmapPath : String;
	var repeat : String;
	var matrix : nanofl.engine.geom.Matrix;
	function save(out:htmlparser.XmlBuilder) : Void;
	function clone() : nanofl.engine.fills.IFill;
	function applyAlpha(alpha:Float) : Void;
	function begin(g:nanofl.engine.Render) : Void;
	function getBitmapWidth() : Float;
	function equ(e:nanofl.engine.fills.IFill) : Bool;
	function swapInstance(oldNamePath:String, newNamePath:String) : Void;
	override function setLibrary(library:nanofl.engine.Library) : Void;
	function getTransformed(m:nanofl.engine.geom.Matrix) : nanofl.engine.fills.IFill;
	function toString() : String;
	static function load(node:htmlparser.HtmlNodeElement) : nanofl.engine.fills.BitmapFill;
}