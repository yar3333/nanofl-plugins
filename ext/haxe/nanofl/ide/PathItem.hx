package nanofl.ide;

extern class PathItem
{
	function new(element:nanofl.engine.IPathElement, ?layerIndex:Int, ?frameIndex:Int) : Void;
	var element : nanofl.engine.IPathElement;
	var layerIndex(default, null) : Int;
	var frameIndex(default, null) : Int;
	function setLayerIndex(n:Int) : Void;
	function setFrameIndex(n:Int) : Void;
	var layer(get, null) : nanofl.engine.Layer;
	var frame(get, null) : nanofl.engine.Frame;
	function equ(p:nanofl.ide.PathItem) : Bool;
	function clone() : nanofl.ide.PathItem;
}