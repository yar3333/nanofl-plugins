package models.client;

extern class Editor
{
	var container(default, null) : createjs.Container;
	var activeLayer(get, null) : models.client.EditorLayer;
	var figure(default, null) : models.client.Figure;
	@:isVar
	var magnet(get, set) : Bool;
	@:isVar
	var shift(get, set) : Bool;
	var zoomLevel(get, set) : Float;
	@:profile
	function beginEditing(pathItem:models.client.PathItem, ?isCenterView:Bool) : Void;
	@:profile
	function updateShapes() : Void;
	@:profile
	function updateElement(element:models.common.elements.Element) : Void;
	function hasSelected() : Bool;
	function toggleSelection() : Bool;
	function select(obj:models.common.ISelectable, ?deselectOthers:Bool) : Void;
	function selectWoUpdate(obj:models.common.ISelectable, ?deselectOthers:Bool) : Void;
	function deselect(obj:models.common.ISelectable) : Void;
	function deselectWoUpdate(obj:models.common.ISelectable) : Void;
	function selectAll() : Void;
	function deselectAll() : Void;
	function deselectAllWoUpdate() : Void;
	function selectLayers(layerIndexes:Array<Int>) : Void;
	function isSelectedAtPos(pos:models.common.geom.Point) : Bool;
	function getItemAtPos(pos:models.common.geom.Point) : models.client.editorelements.EditorElement;
	function getObjectAtPos(pos:models.common.geom.Point) : { var layerIndex : Int; var obj : models.common.ISelectable; };
	function breakApartSelected() : Void;
	function removeSelected() : Void;
	function translateSelected(dx:Float, dy:Float, ?lowLevel:Bool) : Void;
	function updateTransformations() : Void;
	@:noprofile
	function getItems(?includeShape:Bool) : Array<models.client.editorelements.EditorElement>;
	@:noprofile
	function getSelectedItems() : Array<models.client.editorelements.EditorElement>;
	function getObjectLayerIndex(obj:models.common.ISelectable) : Int;
	function extractSelected() : Array<models.common.elements.Element>;
	function isItemCanBeAdded(item:models.common.libraryitems.LibraryItem) : Bool;
	function addElement(element:models.common.elements.Element) : models.client.editorelements.EditorElement;
	function convertToSymbol() : Void;
	function groupSelected() : Void;
	function translateVertex(point:models.common.geom.Point, dx:Float, dy:Float, ?addUndoTransaction:Bool) : Void;
	@:profile
	function rebind(?isCenterView:Bool) : Void;
	@:profile
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
	function swapInstance(instance:models.common.elements.Instance, newNamePath:String) : Void;
	function getForClipboard() : String;
	function pasteFromXml(data:String) : Bool;
	function duplicateSelected() : Void;
	function getObjectsInRectangle(x:Float, y:Float, width:Float, height:Float) : Array<models.common.ISelectable>;
	function cutToClipboard() : Void;
	function copyToClipboard() : Void;
	function pasteFromClipboard() : Void;
}