package nanofl.engine.coloreffects;

extern class ColorEffectAdvanced extends nanofl.engine.coloreffects.ColorEffect
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
	override function save(out:htmlparser.XmlBuilder) : Void;
	override function apply(obj:createjs.DisplayObject) : Void;
	override function clone() : nanofl.engine.coloreffects.ColorEffectAdvanced;
	override function getNeutralClone() : nanofl.engine.coloreffects.ColorEffectAdvanced;
	override function getTweened(k:Float, finish:nanofl.engine.coloreffects.ColorEffect) : nanofl.engine.coloreffects.ColorEffectAdvanced;
	override function equ(c:nanofl.engine.coloreffects.ColorEffect) : Bool;
	static function load(node:htmlparser.HtmlNodeElement) : nanofl.engine.coloreffects.ColorEffectAdvanced;
}