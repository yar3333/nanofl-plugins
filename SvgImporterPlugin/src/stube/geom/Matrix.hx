package stube.geom;

extern class Matrix
{
	var a : Float;
	var b : Float;
	var c : Float;
	var d : Float;
	var tx : Float;
	var ty : Float;
	
	function new(a:Float=1.0, b:Float=0.0, c:Float=0.0, d:Float=1.0, tx:Float=0.0, ty:Float=0.0) : Void;
	function clone() : Matrix;
	function concat(m:Matrix) : Void;
	function createGradientBox(width:Float, height:Float, rotation:Float=0.0, tx:Float=0.0, ty:Float=0.0) : Void;
	function identity() : Void;
	function invert() : Void;
	function rotate(angle:Float) : Void;
	function scale(sx:Float, sy:Float) : Void;
	function toString() : String;
	function translate(dx:Float, dy:Float) : Void;
}
