package models.client;

extern class PathItem
{
	function new(element:models.common.IPathElement, ?layerIndex:Int, ?frameIndex:Int) : Void;
	var element : models.common.IPathElement;
	var layerIndex(default, null) : Int;
	var frameIndex(default, null) : Int;
	function setLayerIndex(n:Int) : Void;
	function setFrameIndex(n:Int) : Void;
	var layer(get, null) : models.common.Layer;
	var frame(get, null) : models.common.Frame;
	function equ(p:models.client.PathItem) : Bool;
	function clone() : models.client.PathItem;
}