package models.common.elements;

extern class Element
{
	var matrix : models.common.geom.Matrix;
	var regX : Float;
	var regY : Float;
	var visible : Bool;
	var keyFrame(default, null) : models.common.KeyFrame;
	function getType() : String;
	function removeInstance(namePath:String) : Void;
	function swapInstance(oldNamePath:String, newNamePath:String) : Void;
	function hasInstance(namePath:String) : Bool;
	function save(out:models.common.XmlWriter) : Void;
	function clone() : models.common.elements.Element;
	function translate(dx:Float, dy:Float) : Void;
	function createDisplayObject(frameIndexes:Array<{ var frameIndex : Int; var element : models.common.IPathElement; }>) : createjs.DisplayObject;
	function updateDisplayObject(dispObj:createjs.DisplayObject, frameIndexes:Array<{ var frameIndex : Int; var element : models.common.IPathElement; }>) : createjs.DisplayObject;
	function getState() : models.client.undo.states.ElementState;
	function setState(state:models.client.undo.states.ElementState) : Void;
	function getUsedItems() : Array<models.common.libraryitems.LibraryItem>;
	function getUsedFilters() : Array<String>;
	function toString() : String;
	static function parse(node:htmlparser.HtmlNodeElement) : models.common.elements.Element;
}