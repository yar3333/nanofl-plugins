package models.common.strokes;

extern class SolidStroke extends models.common.strokes.BaseStroke implements models.common.strokes.IStroke
{
	function new(?color:String, ?thickness:Float, ?caps:String, ?joints:String, ?miterLimit:Float, ?ignoreScale:Bool) : Void;
	var color : String;
	function save(out:models.common.XmlWriter) : Void;
	function begin(g:createjs.Graphics) : Void;
	override function clone() : models.common.strokes.IStroke;
	override function equ(e:models.common.strokes.IStroke) : Bool;
	function swapInstance(oldNamePath:String, newNamePath:String) : Void;
	function toString() : String;
}