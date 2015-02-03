package models.common.coloreffects;

extern class ColorEffect
{
	function apply(obj:createjs.DisplayObject) : Void;
	function clone() : models.common.coloreffects.ColorEffect;
	function getNeutralClone() : models.common.coloreffects.ColorEffect;
	function getTweened(k:Float, finish:models.common.coloreffects.ColorEffect) : models.common.coloreffects.ColorEffect;
	function save(out:models.common.XmlWriter) : Void;
	function equ(c:models.common.coloreffects.ColorEffect) : Bool;
	static function load(node:htmlparser.HtmlNodeElement) : models.common.coloreffects.ColorEffect;
	static function equS(a:models.common.coloreffects.ColorEffect, b:models.common.coloreffects.ColorEffect) : Bool;
}