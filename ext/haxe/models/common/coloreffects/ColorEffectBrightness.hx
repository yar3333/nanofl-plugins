package models.common.coloreffects;

extern class ColorEffectBrightness extends models.common.coloreffects.ColorEffect
{
	function new(value:Float) : Void;
	var value : Float;
	override function save(out:models.common.XmlWriter) : Void;
	override function apply(obj:createjs.DisplayObject) : Void;
	override function clone() : models.common.coloreffects.ColorEffectBrightness;
	override function getNeutralClone() : models.common.coloreffects.ColorEffect;
	override function getTweened(k:Float, finish:models.common.coloreffects.ColorEffect) : models.common.coloreffects.ColorEffect;
	override function equ(c:models.common.coloreffects.ColorEffect) : Bool;
	static function load(node:htmlparser.HtmlNodeElement) : models.common.coloreffects.ColorEffectBrightness;
}