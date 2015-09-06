package nanofl.engine.elements;

extern class Element
{
	var matrix : nanofl.engine.geom.Matrix;
	var regX : Float;
	var regY : Float;
	var visible : Bool;
	var parent(default, null) : nanofl.engine.IElementsContainer;
	function getType() : String;
	function save(out:htmlparser.XmlBuilder) : Void;
	function clone() : nanofl.engine.elements.Element;
	function translate(dx:Float, dy:Float) : Void;
	function createDisplayObject(frameIndexes:Array<{ var frameIndex : Int; var element : nanofl.engine.IPathElement; }>) : createjs.DisplayObject;
	function updateDisplayObject(dispObj:createjs.DisplayObject, frameIndexes:Array<{ var frameIndex : Int; var element : nanofl.engine.IPathElement; }>) : createjs.DisplayObject;
	function getState() : nanofl.ide.undo.states.ElementState;
	function setState(state:nanofl.ide.undo.states.ElementState) : Void;
	function transform(m:nanofl.engine.geom.Matrix, ?applyToStrokeAndFill:Bool) : Void;
	function equ(element:nanofl.engine.elements.Element) : Bool;
	function getNearestPoint(pos:nanofl.engine.geom.Point) : nanofl.engine.geom.Point;
	function toString() : String;
	static function parse(node:htmlparser.HtmlNodeElement) : nanofl.engine.elements.Element;
}