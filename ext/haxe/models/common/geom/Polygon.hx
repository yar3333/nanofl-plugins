package models.common.geom;

extern class Polygon implements models.common.ISelectable
{
	function new(?fill:models.common.fills.IFill, ?contours:Array<models.common.geom.Contour>, ?selected:Bool) : Void;
	var contours(default, null) : Array<models.common.geom.Contour>;
	var fill : models.common.fills.IFill;
	var selected(default, set) : Bool;
	function save(fills:Array<models.common.fills.IFill>, out:models.common.XmlWriter) : Void;
	function draw(g:createjs.Graphics, ?m:createjs.Matrix2D) : Void;
	function translate(dx:Float, dy:Float) : Void;
	function isPointInside(px:Float, py:Float) : Bool;
	function isEdgeInside(edge:models.common.geom.Edge) : Bool;
	function isPolygonInside(p:models.common.geom.Polygon) : Bool;
	function translateVertex(point:models.common.geom.Point, dx:Float, dy:Float) : Void;
	function getBounds(?bounds:models.common.geom.Bounds) : models.common.geom.Bounds;
	function applyFill(fill:models.common.fills.IFill, ?x1:Float, ?y1:Float, ?x2:Float, ?y2:Float) : Void;
	function transform(m:models.common.geom.Matrix) : Void;
	function getEdgesByPoint(x:Float, y:Float, ?edges:Array<models.common.geom.Edge>) : Array<models.common.geom.Edge>;
	function getEdges(?edges:Array<models.common.geom.Edge>) : Array<models.common.geom.Edge>;
	function getPointInside() : models.common.geom.Point;
	function clone() : models.common.geom.Polygon;
	function replaceEdge(search:models.common.geom.Edge, replacement:Array<models.common.geom.Edge>) : Void;
	function getReconstructed(additionalEdges:Array<models.common.geom.Edge>, ?force:Bool) : Array<models.common.geom.Polygon>;
	function export(out:models.common.XmlWriter, fills:Array<models.common.fills.IFill>) : Void;
	function split() : Array<models.common.geom.Polygon>;
	function equ(p:models.common.geom.Polygon) : Bool;
	function roundPoints() : Void;
	function isInRectangle(x:Float, y:Float, width:Float, height:Float) : Bool;
	function toString() : String;
	static function load(node:htmlparser.HtmlNodeElement, fills:Array<models.common.fills.IFill>) : models.common.geom.Polygon;
}