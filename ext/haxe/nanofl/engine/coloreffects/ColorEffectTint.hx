package nanofl.engine.coloreffects;

extern class ColorEffectTint extends nanofl.engine.coloreffects.ColorEffect
{
	function new(color:String, multiplier:Float) : Void;
	var color : String;
	var multiplier : Float;
	override function save(out:nanofl.engine.XmlWriter) : Void;
	override function apply(obj:createjs.DisplayObject) : Void;
	override function clone() : nanofl.engine.coloreffects.ColorEffectTint;
	override function getNeutralClone() : nanofl.engine.coloreffects.ColorEffect;
	override function getTweened(k:Float, finish:nanofl.engine.coloreffects.ColorEffect) : nanofl.engine.coloreffects.ColorEffect;
	override function equ(c:nanofl.engine.coloreffects.ColorEffect) : Bool;
	static function load(node:htmlparser.HtmlNodeElement) : nanofl.engine.coloreffects.ColorEffectTint;
}