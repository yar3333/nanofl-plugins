package models.client.undo.states;

extern class TimelineState
{
	function new(layerStates:Array<models.common.Layer>) : Void;
	var layerStates(default, null) : Array<models.common.Layer>;
}