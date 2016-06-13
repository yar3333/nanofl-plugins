package nanofl.ide.graphicseditor;

extern class EditorMouseEvent extends nanofl.ide.Invalidater
{
	function new(native:createjs.MouseEvent, container:createjs.DisplayObject) : Void;
	var x : Float;
	var y : Float;
	var ctrlKey : Bool;
	var shiftKey : Bool;
}