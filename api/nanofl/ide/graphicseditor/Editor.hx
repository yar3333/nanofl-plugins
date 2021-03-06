package nanofl.ide.graphicseditor;

extern class Editor
{
	var container(default, null) : createjs.Container;
	var activeLayer(default, never) : nanofl.ide.graphicseditor.EditorLayer;
	var activeShape(default, never) : nanofl.engine.elements.ShapeElement;
	var figure(default, null) : nanofl.ide.graphicseditor.Figure;
	var magnet : Bool;
	var shift : Bool;
	var zoomLevel : Float;
	var ready(default, never) : Bool;
	function beginEditing(pathItem:nanofl.ide.PathItem, ?isCenterView:Bool) : Void;
	function updateShapes() : Void;
	function updateElement(element:nanofl.engine.elements.Element) : Void;
	function hasSelected() : Bool;
	function toggleSelection() : Bool;
	function select(obj:nanofl.engine.ISelectable, ?deselectOthers:Bool) : Void;
	function selectWoUpdate(obj:nanofl.engine.ISelectable, ?deselectOthers:Bool) : Void;
	function deselect(obj:nanofl.engine.ISelectable) : Void;
	function deselectWoUpdate(obj:nanofl.engine.ISelectable) : Void;
	function selectAll() : Void;
	function deselectAll() : Void;
	function deselectAllWoUpdate() : Void;
	function selectLayers(layerIndexes:Array<Int>) : Void;
	function isSelectedAtPos(pos:nanofl.engine.geom.Point) : Bool;
	function getItemAtPos(pos:nanofl.engine.geom.Point) : nanofl.ide.graphicseditor.elements.EditorElement;
	function getObjectAtPosEx(pos:nanofl.engine.geom.Point) : { var layerIndex : Int; var obj : nanofl.engine.ISelectable; };
	function breakApartSelected() : Void;
	function removeSelected() : Void;
	function translateSelected(dx:Float, dy:Float, ?lowLevel:Bool) : Void;
	function updateTransformations() : Void;
	@:noprofile
	function getItems(?includeShape:Bool) : Array<nanofl.ide.graphicseditor.elements.EditorElement>;
	@:noprofile
	function getSelectedItems() : Array<nanofl.ide.graphicseditor.elements.EditorElement>;
	function getObjectLayerIndex(obj:nanofl.engine.ISelectable) : Int;
	function extractSelected() : Array<nanofl.engine.elements.Element>;
	function isItemCanBeAdded(item:nanofl.engine.libraryitems.LibraryItem) : Bool;
	function addElement(element:nanofl.engine.elements.Element, ?addUndoTransaction:Bool) : nanofl.ide.graphicseditor.elements.EditorElement;
	function convertToSymbol() : Void;
	function groupSelected() : Void;
	function translateVertex(point:nanofl.engine.geom.Point, dx:Float, dy:Float, ?addUndoTransaction:Bool) : Void;
	function rebind(?isCenterView:Bool) : Void;
	function update() : Void;
	function showAllLayers() : Void;
	function hideAllLayers() : Void;
	function lockAllLayers() : Void;
	function unlockAllLayers() : Void;
	function getSelectedLayerIndexes() : Array<Int>;
	function removeTransformFromSelected() : Void;
	function moveSelectedFront() : Void;
	function moveSelectedForwards() : Void;
	function moveSelectedBackwards() : Void;
	function moveSelectedBack() : Void;
	function swapInstance(instance:nanofl.engine.elements.Instance, newNamePath:String) : Void;
	function saveSelectedToXml(out:htmlparser.XmlBuilder) : Array<nanofl.engine.libraryitems.LibraryItem>;
	function pasteFromXml(xml:htmlparser.XmlNodeElement, ?selectPasted:Bool) : Bool;
	function duplicateSelected() : Void;
	function getObjectsInRectangle(x:Float, y:Float, width:Float, height:Float) : Array<nanofl.engine.ISelectable>;
	function flipSelectedHorizontal() : Void;
	function flipSelectedVertical() : Void;
	function getSelectedBounds() : { var height : Float; var width : Float; var x : Float; var y : Float; };
	function getHitTestGap() : Float;
	function getEditableLayers() : Array<nanofl.ide.graphicseditor.EditorLayer>;
	function saveViewState() : Void;
	function loadViewState() : Void;
}