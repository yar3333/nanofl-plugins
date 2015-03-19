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
	override function save(out:nanofl.engine.XmlWriter) : Void;
	function getText() : String;
	override function createDisplayObject(frameIndexes:Array<{ var frameIndex : Int; var element : nanofl.engine.IPathElement; }>) : createjs.DisplayObject;
	override function updateDisplayObject(dispObj:createjs.DisplayObject, frameIndexes:Array<{ var frameIndex : Int; var element : nanofl.engine.IPathElement; }>) : createjs.DisplayObject;
	function getMinSize(dispObj:createjs.DisplayObject) : { var height : Float; var width : Float; };
	override function clone() : nanofl.engine.elements.Element;
	override function getState() : nanofl.ide.undo.states.ElementState;
	override function setState(_state:nanofl.ide.undo.states.ElementState) : Void;
	override function transform(m:nanofl.engine.geom.Matrix) : Void;
}