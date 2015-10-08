package nanofl.ide;

extern class PathItem
{
	function new(element:nanofl.engine.IPathElement, ?layerIndex:Int, ?frameIndex:Int) : Void;
	var element : nanofl.engine.IPathElement;
	var layerIndex(default, null) : Int;
	var frameIndex(default, null) : Int;
	function setLayerIndex(n:Int) : Void;
	var layer(default, never) : nanofl.engine.Layer;
	var frame(default, never) : nanofl.engine.Frame;
	function getTotalFrames() : Int;
	function equ(p:nanofl.ide.PathItem) : Bool;
	function clone() : nanofl.ide.PathItem;
}