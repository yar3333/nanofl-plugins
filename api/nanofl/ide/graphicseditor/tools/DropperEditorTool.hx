package nanofl.ide.graphicseditor.tools;

extern class DropperEditorTool extends nanofl.ide.graphicseditor.tools.EditorTool
{
	override function allowContextMenu() : Bool;
	override function stageMouseDown(e:nanofl.ide.graphicseditor.EditorMouseEvent) : Void;
	override function stageRightMouseDown(e:nanofl.ide.graphicseditor.EditorMouseEvent) : Void;
	override function stageMouseMove(e:nanofl.ide.graphicseditor.EditorMouseEvent) : Void;
	override function stageMouseUp(e:nanofl.ide.graphicseditor.EditorMouseEvent) : Void;
	override function stageRightMouseUp(e:nanofl.ide.graphicseditor.EditorMouseEvent) : Void;
	override function getPropertiesObject(selectedItems:Array<nanofl.ide.graphicseditor.elements.EditorElement>) : nanofl.ide.PropertiesObject;
}