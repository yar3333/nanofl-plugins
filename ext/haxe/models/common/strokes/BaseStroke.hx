package models.common.strokes;

extern class BaseStroke
{
	var thickness : Float;
	/**
	 *  butt, round, or square. Easeljs's default is butt.
	 */
	var caps : String;
	/**
	 * bevel, round, or miter. Easeljs's default is miter.
	 */
	var joints : String;
	/**
	 * Miter limit ratio which controls at what point a mitered joint will be clipped. Easeljs's default is 10.
	 */
	var miterLimit : Float;
	var ignoreScale : Bool;
	function getSize() : Float;
	function clone() : models.common.strokes.IStroke;
	function equ(e:models.common.strokes.IStroke) : Bool;
	function setLibrary(library:models.common.Library) : Void;
	function getTransformed(m:models.common.geom.Matrix) : models.common.strokes.IStroke;
	static function load(node:htmlparser.HtmlNodeElement) : models.common.strokes.IStroke;
}