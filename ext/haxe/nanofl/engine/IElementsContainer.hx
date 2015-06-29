package nanofl.engine;

extern interface IElementsContainer
{
	var elements(default, never) : nanofl.engine.ArrayRO<nanofl.engine.elements.Element>;
	function addElement(element:nanofl.engine.elements.Element, ?index:Int) : Void;
	function removeElementAt(n:Int) : Void;
	function toString() : String;
}