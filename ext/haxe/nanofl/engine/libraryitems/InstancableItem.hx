package nanofl.engine.libraryitems;

extern class InstancableItem extends nanofl.engine.libraryitems.LibraryItem
{
	var linkedClass : String;
	override function loadProperties(xml:htmlparser.HtmlNodeElement) : Void;
	function newInstance() : nanofl.engine.elements.Instance;
	function hasInstance(namePath:String) : Bool;
	function getDisplayObjectClassName() : String;
	function createDisplayObject(initFrameIndex:Int, childFrameIndexes:Array<{ var frameIndex : Int; var element : nanofl.engine.IPathElement; }>) : createjs.DisplayObject;
	function updateDisplayObject(dispObj:createjs.DisplayObject, childFrameIndexes:Array<{ var frameIndex : Int; var element : nanofl.engine.IPathElement; }>) : Void;
}