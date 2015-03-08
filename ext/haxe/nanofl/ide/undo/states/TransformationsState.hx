package nanofl.ide.undo.states;

extern class TransformationsState
{
	function new(elementStates:Array<nanofl.engine.geom.Matrix>) : Void;
	var elementStates(default, null) : Array<nanofl.engine.geom.Matrix>;
	function equ(state:nanofl.ide.undo.states.TransformationsState) : Bool;
}