package nanofl.ide.undo.states;

extern class NavigatorState
{
	function new(first:{ var frameIndex : Int; var layerIndex : Int; var namePath : String; }, nexts:Array<{ var layerIndex : Int; var frameIndex : Int; var elementIndex : Int; }>) : Void;
	var first(default, null) : { var frameIndex : Int; var layerIndex : Int; var namePath : String; };
	var nexts(default, null) : Array<{ var layerIndex : Int; var frameIndex : Int; var elementIndex : Int; }>;
}