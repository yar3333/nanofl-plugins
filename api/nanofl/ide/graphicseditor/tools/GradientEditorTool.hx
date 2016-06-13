package nanofl.ide.graphicseditor.tools;

extern class GradientEditorTool extends nanofl.ide.graphicseditor.tools.EditorTool
{
	override function isShowRegPoints() : Bool;
	override function selectionChange() : Void;
	override function stageClick(e:nanofl.ide.graphicseditor.EditorMouseEvent) : Void;
	override function stageMouseMove(e:nanofl.ide.graphicseditor.EditorMouseEvent) : Void;
	override function getPropertiesObject(selectedItems:Array<nanofl.ide.graphicseditor.elements.EditorElement>) : nanofl.ide.PropertiesObject;
}