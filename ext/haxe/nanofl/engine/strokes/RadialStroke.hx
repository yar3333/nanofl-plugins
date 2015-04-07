package nanofl.engine.strokes;

extern class RadialStroke extends nanofl.engine.strokes.BaseStroke implements nanofl.engine.strokes.IStroke
{
	function new(colors:Array<String>, ratios:Array<Float>, x0:Float, y0:Float, r0:Float, x1:Float, y1:Float, r1:Float, ?thickness:Float, ?caps:String, ?joints:String, ?miterLimit:Float, ?ignoreScale:Bool) : Void;
	var colors : Array<String>;
	var ratios : Array<Float>;
	var x0 : Float;
	var y0 : Float;
	var r0 : Float;
	var x1 : Float;
	var y1 : Float;
	var r1 : Float;
	function save(out:nanofl.engine.XmlWriter) : Void;
	function begin(g:createjs.Graphics) : Void;
	override function clone() : nanofl.engine.strokes.IStroke;
	override function equ(e:nanofl.engine.strokes.IStroke) : Bool;
	function swapInstance(oldNamePath:String, newNamePath:String) : Void;
	function applyAlpha(alpha:Float) : Void;
	override function getTransformed(m:nanofl.engine.geom.Matrix) : nanofl.engine.strokes.IStroke;
	function toString() : String;
}