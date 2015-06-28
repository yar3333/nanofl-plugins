package nanofl.engine.tweens;

extern class MotionTween
{
	function new(easing:Int, rotateCount:Int, orientToPath:Bool) : Void;
	var easing : Int;
	var rotateCount : Int;
	var orientToPath : Bool;
	function save(out:htmlparser.XmlBuilder) : Void;
	function apply(frameSubIndex:Int) : Array<nanofl.engine.TweenedElement>;
	function clone() : nanofl.engine.tweens.MotionTween;
	function isGood() : Bool;
	static function load(node:htmlparser.HtmlNodeElement) : nanofl.engine.tweens.MotionTween;
}