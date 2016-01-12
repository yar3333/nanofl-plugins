package nanofl.ide.undo.states;

extern class TransformationState
{
	function new(matrix:nanofl.engine.geom.Matrix, rotationX:Float, rotationY:Float) : Void;
	function equ(state:nanofl.ide.undo.states.TransformationState) : Bool;
	function toElement(element:nanofl.engine.elements.Element) : Void;
	static function fromElement(element:nanofl.engine.elements.Element) : nanofl.ide.undo.states.TransformationState;
}