package nanofl.ide.editorelements;

extern class EditorElementSelectBox extends nanofl.ide.editorelements.EditorElement
{
	override function updateTransformations() : Void;
	override function onClick(e:createjs.MouseEvent) : Void;
	override function onMouseDown(e:createjs.MouseEvent) : Void;
	override function onMouseUp(e:createjs.MouseEvent) : Void;
	override function onDoubleClick(e:createjs.MouseEvent) : Void;
}