package nanofl;

extern class MovieClip extends createjs.Container
{
	function new(symbol:nanofl.engine.libraryitems.MovieClipItem, initFrameIndex:Int, childFrameIndexes:Array<{ var frameIndex : Int; var element : nanofl.engine.IPathElement; }>) : Void;
	var symbol(default, null) : nanofl.engine.libraryitems.MovieClipItem;
	var currentFrame(default, null) : Int;
	function addChildToLayer(child:createjs.DisplayObject, layerIndex:Int) : createjs.DisplayObject;
	override function removeAllChildren() : Void;
	override function removeChild(child:createjs.DisplayObject) : Bool;
	override function removeChildAt(index:Int) : Bool;
	function getTotalFrames() : Int;
	function maskChild(child:createjs.DisplayObject) : Bool;
	function uncacheChild(child:createjs.DisplayObject) : Void;
	/**
	 * Return keeped children MovieClips. Return null if all children are keeped.
	 */
	function gotoFrame(labelOrIndex:Dynamic) : Array<nanofl.AdvancableDisplayObject>;
	override function clone(?recursive:Bool) : createjs.DisplayObject;
	override function toString() : String;
	static function applyMask(mask:createjs.DisplayObject, obj:createjs.DisplayObject) : Bool;
}