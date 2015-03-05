package models.client.undo.states;

extern class FigureState
{
	function new(shapeStates:Array<models.client.undo.states.ShapeState>) : Void;
	var shapeStates(default, null) : Array<models.client.undo.states.ShapeState>;
	function equ(state:models.client.undo.states.FigureState) : Bool;
}