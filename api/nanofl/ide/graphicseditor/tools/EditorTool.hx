package nanofl.ide.graphicseditor.tools;

extern class EditorTool
{
	function beginEditing(item:nanofl.ide.graphicseditor.elements.EditorElement) : Void;
	function endEditing() : Void;
	function isShowCenterCross() : Bool;
	function isShowRegPoints() : Bool;
	function getCursor() : String;
	function stageClick(e:nanofl.ide.graphicseditor.EditorMouseEvent) : Void;
	function stageMouseDown(e:nanofl.ide.graphicseditor.EditorMouseEvent) : Void;
	function stageMouseMove(e:nanofl.ide.graphicseditor.EditorMouseEvent) : Void;
	function stageMouseUp(e:nanofl.ide.graphicseditor.EditorMouseEvent) : Void;
	function stageDoubleClick(e:nanofl.ide.graphicseditor.EditorMouseEvent) : Void;
	function stageRightMouseDown(e:nanofl.ide.graphicseditor.EditorMouseEvent) : Void;
	function stageRightMouseUp(e:nanofl.ide.graphicseditor.EditorMouseEvent) : Void;
	function itemMouseDown(e:nanofl.ide.graphicseditor.EditorMouseEvent, item:nanofl.ide.graphicseditor.elements.EditorElement) : Void;
	function itemPressUp(e:nanofl.ide.graphicseditor.EditorMouseEvent) : Void;
	function itemChanged(item:nanofl.ide.graphicseditor.elements.EditorElement) : Void;
	function figureChanged() : Void;
	function onSelectedTranslate(dx:Float, dy:Float) : Void;
	function getPropertiesObject(selectedItems:Array<nanofl.ide.graphicseditor.elements.EditorElement>) : nanofl.ide.PropertiesObject;
	function allowContextMenu() : Bool;
	function draw(shapeSelections:createjs.Shape, itemSelections:createjs.Shape) : Void;
	function selectionChange() : Void;
	static function create<T>(clas:Class<T>, editor:nanofl.ide.graphicseditor.Editor, library:nanofl.ide.graphicseditor.EditorLibrary, navigator:nanofl.ide.Navigator, view:nanofl.ide.View, newObjectParams:nanofl.ide.graphicseditor.NewObjectParams, undoQueue:nanofl.ide.undo.document.UndoQueue) : T;
}