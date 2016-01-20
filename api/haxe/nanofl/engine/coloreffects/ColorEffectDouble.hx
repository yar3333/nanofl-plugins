package nanofl.engine.coloreffects;

extern class ColorEffectDouble extends nanofl.engine.coloreffects.ColorEffect
{
	function new(effect0:nanofl.engine.coloreffects.ColorEffect, effect1:nanofl.engine.coloreffects.ColorEffect) : Void;
	override function apply(obj:createjs.DisplayObject) : Void;
	override function equ(c:nanofl.engine.coloreffects.ColorEffect) : Bool;
}