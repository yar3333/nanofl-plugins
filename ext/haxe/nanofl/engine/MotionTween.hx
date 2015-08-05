package nanofl.engine;

extern class MotionTween
{
	function new(easing:Int, rotateCount:Int, orientToPath:Bool) : Void;
	var easing : Int;
	var rotateCount : Int;
	var orientToPath : Bool;
	function save(out:htmlparser.XmlBuilder) : Void;
	function apply(frameSubIndex:Int) : Array<nanofl.engine.TweenedElement>;
	function clone() : nanofl.engine.MotionTween;
	function isGood() : Bool;
	function equ(motionTween:nanofl.engine.MotionTween) : Bool;
	static function load(node:htmlparser.HtmlNodeElement) : nanofl.engine.MotionTween;
}