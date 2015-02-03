package models.common.coloreffects;

extern class ColorEffectDouble extends models.common.coloreffects.ColorEffect
{
	function new(effect0:models.common.coloreffects.ColorEffect, effect1:models.common.coloreffects.ColorEffect) : Void;
	override function apply(obj:createjs.DisplayObject) : Void;
	override function equ(c:models.common.coloreffects.ColorEffect) : Bool;
}