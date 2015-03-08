package nanofl.ide.editorelements;

extern class EditorElementText extends nanofl.ide.editorelements.EditorElementSelectBox
{
	var element(get, never) : nanofl.engine.elements.TextElement;
	override function update() : Void;
	override function hitTest(x:Float, y:Float) : Bool;
	function beginEditing() : Void;
	function endEditing() : Void;
	function setSelectionFormat(format:nanofl.TextRun) : Void;
	function getSelectionFormat() : nanofl.TextRun;
	function setPosAndSize(obj:{ var height : Float; var width : Float; var x : Float; var y : Float; }) : Void;
	function getMinSize() : { var height : Float; var width : Float; };
}