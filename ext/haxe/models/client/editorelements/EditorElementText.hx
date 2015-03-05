package models.client.editorelements;

extern class EditorElementText extends models.client.editorelements.EditorElementSelectBox
{
	var element(get, never) : models.common.elements.TextElement;
	override function update() : Void;
	override function hitTest(x:Float, y:Float) : Bool;
	function beginEditing() : Void;
	function endEditing() : Void;
	function setSelectionFormat(format:nanofl.TextRun) : Void;
	function getSelectionFormat() : nanofl.TextRun;
	function setPosAndSize(obj:{ var height : Float; var width : Float; var x : Float; var y : Float; }) : Void;
	function getMinSize() : { var height : Float; var width : Float; };
}