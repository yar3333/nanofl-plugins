package nanofl.ide.undo.states;

extern class TimelineState
{
	function new(layerStates:Array<nanofl.engine.Layer>) : Void;
	var layerStates(default, null) : Array<nanofl.engine.Layer>;
}