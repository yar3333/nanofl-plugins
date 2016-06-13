package nanofl.ide.graphicseditor.tools;

extern class TransformEditorTool extends nanofl.ide.graphicseditor.tools.SelectEditorTool
{
	override function isShowRegPoints() : Bool;
	override function selectionChange() : Void;
	override function draw(shapeSelections:createjs.Shape, itemSelections:createjs.Shape) : Void;
	override function onSelectedTranslate(dx:Float, dy:Float) : Void;
	override function stageMouseMove(e:nanofl.ide.graphicseditor.EditorMouseEvent) : Void;
	override function itemChanged(item:nanofl.ide.graphicseditor.elements.EditorElement) : Void;
	override function figureChanged() : Void;
}