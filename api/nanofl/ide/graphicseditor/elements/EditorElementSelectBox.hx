package nanofl.ide.graphicseditor.elements;

extern class EditorElementSelectBox extends nanofl.ide.graphicseditor.elements.EditorElement
{
	override function updateTransformations() : Void;
	override function onClick(e:createjs.MouseEvent) : Void;
	override function onMouseDown(e:createjs.MouseEvent) : Void;
	override function onMouseUp(e:createjs.MouseEvent) : Void;
	override function onDoubleClick(e:createjs.MouseEvent) : Void;
}