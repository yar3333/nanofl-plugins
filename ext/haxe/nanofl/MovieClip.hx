package nanofl;

extern class MovieClip extends createjs.Container
{
	function new(symbol:models.common.libraryitems.MovieClipItem, initFrameIndex:Int, childFrameIndexes:Array<{ var frameIndex : Int; var element : models.common.IPathElement; }>) : Void;
	var symbol(default, null) : models.common.libraryitems.MovieClipItem;
	var currentFrame(default, null) : Int;
	function addChildToLayer(child:createjs.DisplayObject, layerIndex:Int) : createjs.DisplayObject;
	override function removeAllChildren() : Void;
	override function removeChild(child:createjs.DisplayObject) : Bool;
	override function removeChildAt(index:Int) : Bool;
	function getTotalFrames() : Int;
	function maskChild(child:createjs.DisplayObject) : Bool;
	function uncacheChild(child:createjs.DisplayObject) : Void;
	override function toString() : String;
	static function applyMask(mask:createjs.DisplayObject, obj:createjs.DisplayObject) : Bool;
}