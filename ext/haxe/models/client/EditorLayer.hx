package models.client;

extern class EditorLayer
{
	var container(default, null) : createjs.Container;
	var shape(default, null) : models.client.editorelements.EditorElementShape;
	var editable(get, never) : Bool;
	var parentIndex(get, never) : Int;
	var type(get, never) : String;
	function addElement(element:models.common.elements.Element, ?index:Int) : models.client.editorelements.EditorElement;
	function removeSelected() : Void;
	@:noprofile
	function getItems(?r:Array<models.client.editorelements.EditorElement>, ?includeShape:Bool) : Array<models.client.editorelements.EditorElement>;
	@:noprofile
	function getSelectedItems(?r:Array<models.client.editorelements.EditorElement>) : Array<models.client.editorelements.EditorElement>;
	function hasSelected() : Bool;
	function isAllSelected() : Bool;
	@:noprofile
	function hasItem(item:models.client.editorelements.EditorElement) : Bool;
	function selectAll() : Void;
	function deselectAll() : Void;
	function breakApartSelectedItems() : Void;
	function show() : Void;
	function hide() : Void;
	function lock() : Void;
	function unlock() : Void;
	function getItemAtPos(pos:models.common.geom.Point) : models.client.editorelements.EditorElement;
	function getEditablessReason() : String;
	function moveSelectedFront() : Void;
	function moveSelectedForwards() : Void;
	function moveSelectedBackwards() : Void;
	function moveSelectedBack() : Void;
	function magnetSelectedToGuide() : Void;
	function getIndex() : Int;
	function getTweenedElements(frameIndex:Int) : Array<models.common.TweenedElement>;
	function update() : Void;
	function getChildLayers() : Array<models.client.EditorLayer>;
	function getElementIndex(element:models.common.elements.Element) : Int;
	function getElementByIndex(elementIndex:Int) : models.common.elements.Element;
	function getElementsState() : { var elements : Array<models.common.elements.Element>; };
	function duplicateSelected() : Void;
	function isShowSelection() : Bool;
}