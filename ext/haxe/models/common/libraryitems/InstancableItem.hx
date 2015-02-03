package models.common.libraryitems;

extern class InstancableItem extends models.common.libraryitems.LibraryItem
{
	var linkedClass : String;
	function newInstance() : models.common.elements.Instance;
	function hasInstance(namePath:String) : Bool;
	function getDisplayObjectClassName() : String;
	function createDisplayObject(initFrameIndex:Int, childFrameIndexes:Array<{ var frameIndex : Int; var element : models.common.IPathElement; }>) : createjs.DisplayObject;
	function updateDisplayObject(dispObj:createjs.DisplayObject, childFrameIndexes:Array<{ var frameIndex : Int; var element : models.common.IPathElement; }>) : Void;
}