package nanofl.ide.graphicseditor.tools;

extern class TextEditorTool extends nanofl.ide.graphicseditor.tools.EditorTool
{
	override function beginEditing(item:nanofl.ide.graphicseditor.elements.EditorElement) : Void;
	override function endEditing() : Void;
	override function isShowCenterCross() : Bool;
	override function getCursor() : String;
	override function stageClick(e:nanofl.ide.graphicseditor.EditorMouseEvent) : Void;
	override function itemMouseDown(e:nanofl.ide.graphicseditor.EditorMouseEvent, item:nanofl.ide.graphicseditor.elements.EditorElement) : Void;
	override function itemChanged(item:nanofl.ide.graphicseditor.elements.EditorElement) : Void;
	override function getPropertiesObject(selectedItems:Array<nanofl.ide.graphicseditor.elements.EditorElement>) : nanofl.ide.PropertiesObject;
	override function draw(shapeSelections:createjs.Shape, itemSelections:createjs.Shape) : Void;
}