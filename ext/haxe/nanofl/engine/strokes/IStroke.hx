package nanofl.engine.strokes;

extern interface IStroke
{
	var thickness : Float;
	var caps : String;
	var joints : String;
	var miterLimit : Float;
	var ignoreScale : Bool;
	function begin(g:createjs.Graphics) : Void;
	function clone() : nanofl.engine.strokes.IStroke;
	function equ(e:nanofl.engine.strokes.IStroke) : Bool;
	function applyAlpha(alpha:Float) : Void;
	function getTransformed(m:nanofl.engine.geom.Matrix) : nanofl.engine.strokes.IStroke;
	function save(out:nanofl.engine.XmlWriter) : Void;
	function swapInstance(oldNamePath:String, newNamePath:String) : Void;
	function setLibrary(library:nanofl.engine.Library) : Void;
	function toString() : String;
}