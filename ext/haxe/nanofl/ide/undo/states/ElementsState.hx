package nanofl.ide.undo.states;

extern class ElementsState
{
	function new(layerElements:Array<{ var elements : Array<nanofl.engine.elements.Element>; }>) : Void;
	var layerElements(default, null) : Array<{ var elements : Array<nanofl.engine.elements.Element>; }>;
}