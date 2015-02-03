package models.client.undo.states;

extern class TextState extends models.client.undo.states.ElementState
{
	function new(width:Float, height:Float, selectable:Bool, border:Bool, textRuns:Array<nanofl.TextRun>) : Void;
	var width(default, null) : Float;
	var height(default, null) : Float;
	var selectable(default, null) : Bool;
	var border(default, null) : Bool;
	var textRuns(default, null) : Array<nanofl.TextRun>;
	override function equ(_state:models.client.undo.states.ElementState) : Bool;
}