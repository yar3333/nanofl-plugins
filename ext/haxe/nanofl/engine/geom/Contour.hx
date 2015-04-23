package nanofl.engine.geom;

extern class Contour
{
	function new(edges:Array<nanofl.engine.geom.Edge>) : Void;
	var edges(default, null) : Array<nanofl.engine.geom.Edge>;
	function save(out:nanofl.engine.XmlWriter) : Void;
	function draw(g:createjs.Graphics) : Void;
	function translate(dx:Float, dy:Float) : Void;
	function isPointInside(px:Float, py:Float) : Bool;
	function isPointInsideP(p:nanofl.engine.geom.Point) : Bool;
	function hasPoint(px:Float, py:Float) : Bool;
	function hasEdge(edge:nanofl.engine.geom.Edge) : Bool;
	function isEdgeInside(edge:nanofl.engine.geom.Edge) : Bool;
	function isNestedTo(outer:nanofl.engine.geom.Contour) : Bool;
	function clone() : nanofl.engine.geom.Contour;
	function isClockwise() : Bool;
	function isCounterClockwise() : Bool;
	function reverse() : nanofl.engine.geom.Contour;
	function getCommonEdges(contour:nanofl.engine.geom.Contour) : Array<nanofl.engine.geom.Edge>;
	function indexIn(contours:Array<nanofl.engine.geom.Contour>) : Int;
	function equ(c:nanofl.engine.geom.Contour) : Bool;
	function toString() : String;
	function assertCorrect() : Void;
}