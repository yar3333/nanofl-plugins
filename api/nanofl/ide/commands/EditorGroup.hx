package nanofl.ide.commands;

extern class EditorGroup extends nanofl.ide.commands.BaseGroup
{
	function new(app:nanofl.ide.Application) : Void;
	function switchToSelectTool() : Void;
	function switchToTransformTool() : Void;
	function switchToTextTool() : Void;
	function switchToPencilTool() : Void;
	function switchToEraserTool() : Void;
	function switchToLineTool() : Void;
	function switchToRectangleTool() : Void;
	function switchToOvalTool() : Void;
	function switchToFillTool() : Void;
	function switchToGradientTool() : Void;
	function switchToDropperTool() : Void;
	function convertToSymbol() : Void;
	function selectAll() : Void;
	function deselectAll() : Void;
	function toggleSelection() : Void;
	function breakApart() : Void;
	function group() : Void;
	function duplicate() : Void;
	function removeTransform() : Void;
	function remove() : Void;
	function translateLeft() : Void;
	function translateRight() : Void;
	function translateUp() : Void;
	function translateDown() : Void;
	function jumpLeft() : Void;
	function jumpRight() : Void;
	function jumpUp() : Void;
	function jumpDown() : Void;
	function moveForwards() : Void;
	function moveBackwards() : Void;
	function moveFront() : Void;
	function moveBack() : Void;
	function flipHorizontal() : Void;
	function flipVertical() : Void;
	function cut() : Void;
	function copy() : Void;
	function paste() : Void;
	function properties() : Void;
	function editCode() : Void;
	function dump() : Void;
}