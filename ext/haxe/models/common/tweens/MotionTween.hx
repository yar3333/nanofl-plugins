package models.common.tweens;

extern class MotionTween
{
	function new(easing:Int, rotateCount:Int, orientToPath:Bool) : Void;
	var easing : Int;
	var rotateCount : Int;
	var orientToPath : Bool;
	function save(out:models.common.XmlWriter) : Void;
	function apply(frameSubIndex:Int) : Array<models.common.TweenedElement>;
	function clone() : models.common.tweens.MotionTween;
	function isGood() : Bool;
	static function load(node:htmlparser.HtmlNodeElement) : models.common.tweens.MotionTween;
}