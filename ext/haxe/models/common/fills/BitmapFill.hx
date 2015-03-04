package models.common.fills;

extern class BitmapFill extends models.common.fills.MatrixFill implements models.common.fills.IFill
{
	function new(bitmapPath:String, matrix:models.common.geom.Matrix, ?repeat:String) : Void;
	var bitmapPath : String;
	var repeat : String;
	function save(out:models.common.XmlWriter) : Void;
	function clone() : models.common.fills.IFill;
	function applyAlpha(alpha:Float) : Void;
	function begin(g:createjs.Graphics) : Void;
	function getBitmapWidth() : Float;
	function equ(e:models.common.fills.IFill) : Bool;
	function swapInstance(oldNamePath:String, newNamePath:String) : Void;
	override function setLibrary(library:models.common.Library) : Void;
	function toString() : String;
	static function load(node:htmlparser.HtmlNodeElement) : models.common.fills.BitmapFill;
}