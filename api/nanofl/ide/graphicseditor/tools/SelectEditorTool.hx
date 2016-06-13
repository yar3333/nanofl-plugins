package nanofl.ide.graphicseditor.tools;

extern class SelectEditorTool extends nanofl.ide.graphicseditor.tools.EditorTool
{
	override function stageMouseDown(e:nanofl.ide.graphicseditor.EditorMouseEvent) : Void;
	override function stageMouseMove(e:nanofl.ide.graphicseditor.EditorMouseEvent) : Void;
	override function stageMouseUp(e:nanofl.ide.graphicseditor.EditorMouseEvent) : Void;
	override function stageDoubleClick(e:nanofl.ide.graphicseditor.EditorMouseEvent) : Void;
	override function getPropertiesObject(selectedItems:Array<nanofl.ide.graphicseditor.elements.EditorElement>) : nanofl.ide.PropertiesObject;
	override function draw(shapeSelections:createjs.Shape, itemSelections:createjs.Shape) : Void;
	override function selectionChange() : Void;
}