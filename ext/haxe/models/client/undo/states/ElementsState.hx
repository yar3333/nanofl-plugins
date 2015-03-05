package models.client.undo.states;

extern class ElementsState
{
	function new(layerElements:Array<{ var elements : Array<models.common.elements.Element>; }>) : Void;
	var layerElements(default, null) : Array<{ var elements : Array<models.common.elements.Element>; }>;
}