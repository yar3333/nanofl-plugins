package nanofl.engine.strokes;

extern class BitmapStroke extends nanofl.engine.strokes.BaseStroke implements nanofl.engine.strokes.IStroke
{
	function new(?bitmapPath:String, ?repeat:String, ?thickness:Float, ?caps:String, ?joints:String, ?miterLimit:Float, ?ignoreScale:Bool) : Void;
	var bitmapPath : String;
	var repeat : String;
	function save(out:nanofl.engine.XmlWriter) : Void;
	function begin(g:nanofl.engine.Render) : Void;
	override function clone() : nanofl.engine.strokes.IStroke;
	override function equ(e:nanofl.engine.strokes.IStroke) : Bool;
	function swapInstance(oldNamePath:String, newNamePath:String) : Void;
	override function setLibrary(library:nanofl.engine.Library) : Void;
	function applyAlpha(alpha:Float) : Void;
	function toString() : String;
}