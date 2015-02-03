package models.common.coloreffects;

extern class ColorEffectAdvanced extends models.common.coloreffects.ColorEffect
{
	function new(alphaMultiplier:Float, redMultiplier:Float, greenMultiplier:Float, blueMultiplier:Float, alphaOffset:Float, redOffset:Float, greenOffset:Float, blueOffset:Float) : Void;
	var redMultiplier : Float;
	var greenMultiplier : Float;
	var blueMultiplier : Float;
	var alphaMultiplier : Float;
	var redOffset : Float;
	var greenOffset : Float;
	var blueOffset : Float;
	var alphaOffset : Float;
	override function save(out:models.common.XmlWriter) : Void;
	override function apply(obj:createjs.DisplayObject) : Void;
	override function clone() : models.common.coloreffects.ColorEffectAdvanced;
	override function getNeutralClone() : models.common.coloreffects.ColorEffect;
	override function getTweened(k:Float, finish:models.common.coloreffects.ColorEffect) : models.common.coloreffects.ColorEffect;
	override function equ(c:models.common.coloreffects.ColorEffect) : Bool;
	static function load(node:htmlparser.HtmlNodeElement) : models.common.coloreffects.ColorEffectAdvanced;
}