package nanofl.engine.geom;

extern class Polygon implements nanofl.engine.ISelectable
{
	function new(?fill:nanofl.engine.fills.IFill, ?contours:Array<nanofl.engine.geom.Contour>, ?selected:Bool) : Void;
	var contours(default, null) : Array<nanofl.engine.geom.Contour>;
	var fill : nanofl.engine.fills.IFill;
	var selected : Bool;
	function save(fills:Array<nanofl.engine.fills.IFill>, out:nanofl.engine.XmlWriter) : Void;
	function draw(g:createjs.Graphics, scaleSelection:Float) : Void;
	function translate(dx:Float, dy:Float) : Void;
	function isPointInside(px:Float, py:Float) : Bool;
	function hasPoint(px:Float, py:Float) : Bool;
	function hasEdge(edge:nanofl.engine.geom.Edge) : Bool;
	function isEdgeInside(edge:nanofl.engine.geom.Edge) : Bool;
	function isEdgeAtLeastPartiallyInside(edge:nanofl.engine.geom.Edge) : Bool;
	function isPolygonInside(p:nanofl.engine.geom.Polygon) : Bool;
	function translateVertex(point:nanofl.engine.geom.Point, dx:Float, dy:Float) : Void;
	function getBounds(?bounds:nanofl.engine.geom.Bounds) : nanofl.engine.geom.Bounds;
	function applyFill(fill:nanofl.engine.fills.IFill, ?x1:Float, ?y1:Float, ?x2:Float, ?y2:Float) : Void;
	function transform(m:nanofl.engine.geom.Matrix, ?applyToFill:Bool) : Void;
	function getEdges(?edges:Array<nanofl.engine.geom.Edge>) : Array<nanofl.engine.geom.Edge>;
	function getPointInside() : nanofl.engine.geom.Point;
	function clone() : nanofl.engine.geom.Polygon;
	function replaceEdge(search:nanofl.engine.geom.Edge, replacement:Array<nanofl.engine.geom.Edge>) : Void;
	function export(out:nanofl.engine.XmlWriter, fills:Array<nanofl.engine.fills.IFill>) : Void;
	function split() : Array<nanofl.engine.geom.Polygon>;
	function equ(p:nanofl.engine.geom.Polygon) : Bool;
	function normalize() : Void;
	function isInRectangle(x:Float, y:Float, width:Float, height:Float) : Bool;
	function assertCorrect() : Void;
	function isContourOutside(c:nanofl.engine.geom.Contour) : Bool;
	function toString() : String;
	static var showSelection : Bool;
	static function load(node:htmlparser.HtmlNodeElement, fills:Array<nanofl.engine.fills.IFill>) : nanofl.engine.geom.Polygon;
}