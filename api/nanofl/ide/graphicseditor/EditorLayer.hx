package nanofl.ide.graphicseditor;

extern class EditorLayer
{
	var container(default, null) : createjs.Container;
	var shape(default, null) : nanofl.ide.graphicseditor.elements.EditorElementShape;
	var editable(get, never) : Bool;
	var parentIndex(get, never) : Int;
	var type(get, never) : String;
	function addElement(element:nanofl.engine.elements.Element, ?index:Int) : nanofl.ide.graphicseditor.elements.EditorElement;
	function addElements<T>(elements:Array<T>, ?index:Int) : Array<nanofl.ide.graphicseditor.elements.EditorElement>;
	function removeSelected() : Void;
	@:noprofile
	function getItems(?r:Array<nanofl.ide.graphicseditor.elements.EditorElement>, ?includeShape:Bool) : Array<nanofl.ide.graphicseditor.elements.EditorElement>;
	@:noprofile
	function getSelectedItems(?r:Array<nanofl.ide.graphicseditor.elements.EditorElement>) : Array<nanofl.ide.graphicseditor.elements.EditorElement>;
	function hasSelected() : Bool;
	function isAllSelected() : Bool;
	@:noprofile
	function hasItem(item:nanofl.ide.graphicseditor.elements.EditorElement) : Bool;
	function selectAll() : Void;
	function deselectAll() : Void;
	function breakApartSelectedItems() : Void;
	function show() : Void;
	function hide() : Void;
	function lock() : Void;
	function unlock() : Void;
	function getItemAtPos(pos:nanofl.engine.geom.Point) : nanofl.ide.graphicseditor.elements.EditorElement;
	function getEditablessReason() : String;
	function moveSelectedFront() : Void;
	function moveSelectedForwards() : Void;
	function moveSelectedBackwards() : Void;
	function moveSelectedBack() : Void;
	function magnetSelectedToGuide() : Void;
	function getIndex() : Int;
	function getTweenedElements(frameIndex:Int) : Array<nanofl.engine.TweenedElement>;
	function update() : Void;
	function getChildLayers() : Array<nanofl.ide.graphicseditor.EditorLayer>;
	function getElementIndex(element:nanofl.engine.elements.Element) : Int;
	function getElementByIndex(elementIndex:Int) : nanofl.engine.elements.Element;
	function getElementsState() : { var elements : Array<nanofl.engine.elements.Element>; };
	function duplicateSelected() : Void;
	function isShowSelection() : Bool;
	function getVertexAtPos(pt:nanofl.engine.geom.Point) : nanofl.engine.geom.Point;
	function getEdgeAtPos(pos:nanofl.engine.geom.Point) : nanofl.engine.geom.Edge;
	function getStrokeEdgeAtPos(pos:nanofl.engine.geom.Point) : nanofl.engine.geom.StrokeEdge;
	function getPolygonEdgeAtPos(pt:nanofl.engine.geom.Point) : nanofl.engine.geom.Edge;
	function getPolygonAtPos(pt:nanofl.engine.geom.Point) : nanofl.engine.geom.Polygon;
	function getObjectAtPos(pos:nanofl.engine.geom.Point) : nanofl.engine.ISelectable;
}