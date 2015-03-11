package nanofl.engine.elements;

extern class Element
{
	var matrix : nanofl.engine.geom.Matrix;
	var regX : Float;
	var regY : Float;
	var visible : Bool;
	var keyFrame(default, null) : nanofl.engine.KeyFrame;
	function getType() : String;
	function removeInstance(namePath:String) : Void;
	function swapInstance(oldNamePath:String, newNamePath:String) : Void;
	function hasInstance(namePath:String) : Bool;
	function save(out:nanofl.engine.XmlWriter) : Void;
	function clone() : nanofl.engine.elements.Element;
	function translate(dx:Float, dy:Float) : Void;
	function createDisplayObject(frameIndexes:Array<{ var frameIndex : Int; var element : nanofl.engine.IPathElement; }>) : createjs.DisplayObject;
	function updateDisplayObject(dispObj:createjs.DisplayObject, frameIndexes:Array<{ var frameIndex : Int; var element : nanofl.engine.IPathElement; }>) : createjs.DisplayObject;
	function getState() : nanofl.ide.undo.states.ElementState;
	function setState(state:nanofl.ide.undo.states.ElementState) : Void;
	function getUsedItems() : Array<nanofl.engine.libraryitems.LibraryItem>;
	function getUsedFilters() : Array<String>;
	function toString() : String;
	static function parse(node:htmlparser.HtmlNodeElement) : nanofl.engine.elements.Element;
}