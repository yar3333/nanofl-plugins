package models.common.geom;

typedef EdgesItersection =
{
	var a : Array<models.common.geom.Edge>;
	var b : Array<models.common.geom.Edge>;
};

extern class Edge
{
	function new(x1:Float, y1:Float, x2:Float, y2:Float, ?x3:Float, ?y3:Float) : Void;
	var x1 : Float;
	var y1 : Float;
	var x2 : Float;
	var y2 : Float;
	var x3 : Float;
	var y3 : Float;
	function isStraight() : Bool;
	function getIntersectionCount_rightRay(mx:Float, my:Float) : Int;
	function getIntersectionPointsX_rightRay(mx:Float, my:Float) : Array<Float>;
	function draw(g:createjs.Graphics, m:createjs.Matrix2D) : Void;
	function equ(e:models.common.geom.Edge) : Bool;
	function getNearestPoint(x:Float, y:Float) : { var point : models.common.geom.Point; var t : Float; };
	function translate(dx:Float, dy:Float) : Void;
	function translateVertex(point:models.common.geom.Point, dx:Float, dy:Float) : Void;
	function translateStart(dx:Float, dy:Float) : Void;
	function translateEnd(dx:Float, dy:Float) : Void;
	function reverse() : models.common.geom.Edge;
	function getBounds(?bounds:models.common.geom.Bounds) : models.common.geom.Bounds;
	function toString() : String;
	function getMiddlePoint() : models.common.geom.Point;
	function hasCommonVertices(edge:models.common.geom.Edge) : Bool;
	function transform(m:models.common.geom.Matrix) : Void;
	function asStraightLine() : models.common.geom.StraightLine;
	function asBezierCurve() : models.common.geom.BezierCurve;
	function clone() : models.common.geom.Edge;
	function indexIn<T>(edges:Array<T>) : Int;
	function isDegeneratedToPoint() : Bool;
	function roundCoords() : Void;
	function getLength() : Float;
	function getPart(t:Float) : models.common.geom.Edge;
	function getPoint(t:Float) : models.common.geom.Point;
	function getTangent(t:Float) : Float;
	function split(t:Float) : Array<models.common.geom.Edge>;
	function isInRectangle(x:Float, y:Float, width:Float, height:Float) : Bool;
	static function fromStraightLine(line:models.common.geom.StraightLine) : models.common.geom.Edge;
	static function fromBezierCurve(curve:models.common.geom.BezierCurve) : models.common.geom.Edge;
	static function getIntersection(edgeA:models.common.geom.Edge, edgeB:models.common.geom.Edge) : models.common.geom.Edge.EdgesItersection;
}