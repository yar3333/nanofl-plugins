package nanofl.ide.graphicseditor.tools;

extern class DrawEditorTool extends nanofl.ide.graphicseditor.tools.EditorTool
{
	override function stageMouseDown(e:nanofl.ide.graphicseditor.EditorMouseEvent) : Void;
	override function stageMouseMove(e:nanofl.ide.graphicseditor.EditorMouseEvent) : Void;
	override function stageMouseUp(e:nanofl.ide.graphicseditor.EditorMouseEvent) : Void;
	override function draw(shapeSelections:createjs.Shape, itemSelections:createjs.Shape) : Void;
}