package nanofl.engine.elements;

extern class TextElement extends nanofl.engine.elements.Element
{
	function new(name:String, width:Float, height:Float, selectable:Bool, border:Bool, textRuns:Array<nanofl.TextRun>, ?newTextFormat:nanofl.TextRun) : Void;
	var name : String;
	var width : Float;
	var height : Float;
	var selectable : Bool;
	var border : Bool;
	var textRuns : Array<nanofl.TextRun>;
	var newTextFormat : nanofl.TextRun;
	override function save(out:htmlparser.XmlBuilder) : Void;
	function getText() : String;
	override function createDisplayObject(frameIndexes:Array<{ var frameIndex : Int; var element : nanofl.engine.IPathElement; }>) : nanofl.TextField;
	override function updateDisplayObject(dispObj:createjs.DisplayObject, frameIndexes:Array<{ var frameIndex : Int; var element : nanofl.engine.IPathElement; }>) : nanofl.TextField;
	function getMinSize(dispObj:createjs.DisplayObject) : { var height : Float; var width : Float; };
	override function clone() : nanofl.engine.elements.TextElement;
	override function getState() : nanofl.ide.undo.states.ElementState;
	override function setState(_state:nanofl.ide.undo.states.ElementState) : Void;
	override function equ(element:nanofl.engine.elements.Element) : Bool;
	function breakApart() : Array<nanofl.engine.elements.TextElement>;
	override function fixErrors() : Bool;
}