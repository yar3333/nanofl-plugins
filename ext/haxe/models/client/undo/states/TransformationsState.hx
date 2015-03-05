package models.client.undo.states;

extern class TransformationsState
{
	function new(elementStates:Array<models.common.geom.Matrix>) : Void;
	var elementStates(default, null) : Array<models.common.geom.Matrix>;
	function equ(state:models.client.undo.states.TransformationsState) : Bool;
}