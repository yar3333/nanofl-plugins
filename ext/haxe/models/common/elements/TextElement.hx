package models.common.elements;

extern class TextElement extends models.common.elements.Element
{
	function new(name:String, width:Float, height:Float, selectable:Bool, border:Bool, textRuns:Array<nanofl.TextRun>, newTextFormat:nanofl.TextRun) : Void;
	var name : String;
	var width : Float;
	var height : Float;
	var selectable : Bool;
	var border : Bool;
	var textRuns : Array<nanofl.TextRun>;
	var newTextFormat : nanofl.TextRun;
	override function save(out:models.common.XmlWriter) : Void;
	function getText() : String;
	override function createDisplayObject(frameIndexes:Array<{ var frameIndex : Int; var element : models.common.IPathElement; }>) : createjs.DisplayObject;
	override function updateDisplayObject(dispObj:createjs.DisplayObject, frameIndexes:Array<{ var frameIndex : Int; var element : models.common.IPathElement; }>) : createjs.DisplayObject;
	function getMinSize(dispObj:createjs.DisplayObject) : { var height : Float; var width : Float; };
	override function clone() : models.common.elements.Element;
	override function getState() : models.client.undo.states.ElementState;
	override function setState(_state:models.client.undo.states.ElementState) : Void;
}