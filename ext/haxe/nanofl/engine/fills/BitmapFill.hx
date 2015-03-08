package nanofl.engine.fills;

extern class BitmapFill extends nanofl.engine.fills.MatrixFill implements nanofl.engine.fills.IFill
{
	function new(bitmapPath:String, matrix:nanofl.engine.geom.Matrix, ?repeat:String) : Void;
	var bitmapPath : String;
	var repeat : String;
	function save(out:nanofl.engine.XmlWriter) : Void;
	override function clone() : nanofl.engine.fills.IFill;
	function applyAlpha(alpha:Float) : Void;
	function begin(g:createjs.Graphics) : Void;
	function getBitmapWidth() : Float;
	function equ(e:nanofl.engine.fills.IFill) : Bool;
	function swapInstance(oldNamePath:String, newNamePath:String) : Void;
	override function setLibrary(library:nanofl.engine.Library) : Void;
	function toString() : String;
	static function load(node:htmlparser.HtmlNodeElement) : nanofl.engine.fills.BitmapFill;
}