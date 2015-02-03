package models.common.geom;

extern class Contour
{
	function new(edges:Array<models.common.geom.Edge>) : Void;
	var edges(default, null) : Array<models.common.geom.Edge>;
	function save(out:models.common.XmlWriter) : Void;
	function draw(g:createjs.Graphics) : Void;
	function translate(dx:Float, dy:Float) : Void;
	function isPointInside(px:Float, py:Float) : Bool;
	function isPointInsideP(p:models.common.geom.Point) : Bool;
	function hasPoint(px:Float, py:Float) : Bool;
	function hasEdge(edge:models.common.geom.Edge) : Bool;
	function isEdgeInside(edge:models.common.geom.Edge) : Bool;
	function isNestedTo(outer:models.common.geom.Contour, canEqu:Bool) : Bool;
	function clone() : models.common.geom.Contour;
	function isClockwise() : Bool;
	function reverse() : Void;
	function getCommonEdges(contour:models.common.geom.Contour) : Array<models.common.geom.Edge>;
	function indexIn(contours:Array<models.common.geom.Contour>) : Int;
	function equ(c:models.common.geom.Contour) : Bool;
	function toString() : String;
}