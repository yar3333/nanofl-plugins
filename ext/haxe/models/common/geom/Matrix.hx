package models.common.geom;

extern class Matrix
{
	function new(?a:Float, ?b:Float, ?c:Float, ?d:Float, ?tx:Float, ?ty:Float) : Void;
	var a : Float;
	var b : Float;
	var c : Float;
	var d : Float;
	var tx : Float;
	var ty : Float;
	function save(out:models.common.XmlWriter) : Void;
	function decompose() : { var rotation : Float; var scaleX : Float; var scaleY : Float; var skewX : Float; var skewY : Float; var x : Float; var y : Float; };
	function setMatrix(m:{ var a : Float; var b : Float; var c : Float; var d : Float; var tx : Float; var ty : Float; }) : models.common.geom.Matrix;
	function isIdentity() : Bool;
	function invert() : models.common.geom.Matrix;
	function transformPoint(x:Float, y:Float) : models.common.geom.Point;
	function clone() : models.common.geom.Matrix;
	function translate(tx:Float, ty:Float) : models.common.geom.Matrix;
	function equ(m:models.common.geom.Matrix) : Bool;
	function setTransform(x:Float, y:Float, scaleX:Float, scaleY:Float, rotation:Float, skewX:Float, skewY:Float, ?regX:Float, ?regY:Float) : models.common.geom.Matrix;
	function appendMatrix(m:models.common.geom.Matrix) : models.common.geom.Matrix;
	function prependMatrix(m:models.common.geom.Matrix) : models.common.geom.Matrix;
	function append(a:Float, b:Float, c:Float, d:Float, tx:Float, ty:Float) : models.common.geom.Matrix;
	function prepend(a:Float, b:Float, c:Float, d:Float, tx:Float, ty:Float) : models.common.geom.Matrix;
	function appendTransform(x:Float, y:Float, ?scaleX:Float, ?scaleY:Float, ?rotation:Float, ?skewX:Float, ?skewY:Float, ?regX:Float, ?regY:Float) : models.common.geom.Matrix;
	function prependTransform(x:Float, y:Float, ?scaleX:Float, ?scaleY:Float, ?rotation:Float, ?skewX:Float, ?skewY:Float, ?regX:Float, ?regY:Float) : models.common.geom.Matrix;
	function rotate(angle:Float) : models.common.geom.Matrix;
	function skew(skewX:Float, skewY:Float) : models.common.geom.Matrix;
	function scale(kx:Float, ky:Float) : models.common.geom.Matrix;
	function toMatrix2D() : createjs.Matrix2D;
	function toString() : String;
	static function load(node:htmlparser.HtmlNodeElement) : models.common.geom.Matrix;
	static function fromMatrix2D(m:createjs.Matrix2D) : models.common.geom.Matrix;
}