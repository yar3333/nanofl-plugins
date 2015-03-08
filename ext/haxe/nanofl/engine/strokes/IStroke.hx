package nanofl.engine.strokes;

extern interface IStroke
{
	function begin(g:createjs.Graphics) : Void;
	function clone() : nanofl.engine.strokes.IStroke;
	function getSize() : Float;
	function equ(e:nanofl.engine.strokes.IStroke) : Bool;
	function save(out:nanofl.engine.XmlWriter) : Void;
	function swapInstance(oldNamePath:String, newNamePath:String) : Void;
	function applyAlpha(alpha:Float) : Void;
	function getTransformed(m:nanofl.engine.geom.Matrix) : nanofl.engine.strokes.IStroke;
	function setLibrary(library:nanofl.engine.Library) : Void;
	function toString() : String;
}