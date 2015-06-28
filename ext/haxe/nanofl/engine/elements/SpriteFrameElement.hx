package nanofl.engine.elements;

extern class SpriteFrameElement extends nanofl.engine.elements.Element
{
	function new(sprite:nanofl.engine.libraryitems.SpriteItem, index:Int) : Void;
	override function getType() : String;
	override function save(out:htmlparser.XmlBuilder) : Void;
	override function clone() : nanofl.engine.elements.Element;
	override function getState() : nanofl.ide.undo.states.ElementState;
	override function setState(state:nanofl.ide.undo.states.ElementState) : Void;
	override function createDisplayObject(frameIndexes:Array<{ var frameIndex : Int; var element : nanofl.engine.IPathElement; }>) : createjs.DisplayObject;
	override function updateDisplayObject(dispObj:createjs.DisplayObject, frameIndexes:Array<{ var frameIndex : Int; var element : nanofl.engine.IPathElement; }>) : createjs.DisplayObject;
	override function toString() : String;
}