package nanofl;

extern class TextField extends createjs.Container
{
	var border(default, set) : Bool;
	var change(default, null) : stdlib.Event<{}>;
	var dashedBorder(default, set) : Bool;
	var editing(default, set) : Bool;
	var height(default, set) : Float;
	var minHeight(default, null) : Float;
	var minWidth(default, null) : Float;
	var newTextFormat(default, set) : TextRun;
	var resize(default, null) : stdlib.Event<{ width : Float, height:Float }>;
	var selectable : Bool;
	var selectionEnd(null, set) : Int;
	var selectionStart(null, set) : Int;
	var text(get, set) : String;
	var textRuns : Array<TextRun>;
	var width(default, set) : Float;
	function new(width:Float=0.0, height:Float=0.0, selectable:Bool=false, border:Bool=false, dashedBorder:Bool=false, ?textRuns:Array<TextRun>, ?newTextFormat:TextRun) : Void;
	function dispose() : Void;
	function getSelectionFormat() : TextRun;
	function setSelectionFormat(format:TextRun) : Void;
	function update() : Void;
}
