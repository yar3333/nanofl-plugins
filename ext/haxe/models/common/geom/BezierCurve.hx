package models.common.geom;

typedef BezierCurvesIntersection =
{
	var a : Array<models.common.geom.BezierCurve>;
	var b : Array<models.common.geom.BezierCurve>;
};

extern class BezierCurve
{
	function new(x1:Float, y1:Float, x2:Float, y2:Float, x3:Float, y3:Float) : Void;
	var p1(default, null) : models.common.geom.Point;
	var p2(default, null) : models.common.geom.Point;
	var p3(default, null) : models.common.geom.Point;
	function update(?x1:Float, ?y1:Float, ?x2:Float, ?y2:Float, ?x3:Float, ?y3:Float) : Void;
	function getNearestPoint(x:Float, y:Float) : { var dist : Float; var nor : models.common.geom.Point; var onCurve : Bool; var orientedDist : Float; var point : models.common.geom.Point; var t : Float; };
	function getNearestPointP(pt:models.common.geom.Point) : { var dist : Float; var nor : models.common.geom.Point; var onCurve : Bool; var orientedDist : Float; var point : models.common.geom.Point; var t : Float; };
	function getPoint(t:Float) : models.common.geom.Point;
	function getNor(t:Float) : models.common.geom.Point;
	function getBounds() : models.common.geom.Bounds;
	function getIntersectionPointsX_rightRay(mx:Float, my:Float) : Array<Float>;
	function getIntersectionCount_rightRay(mx:Float, my:Float) : Int;
	function getIntersection_straightSection(line:models.common.geom.StraightLine) : { var curves : Array<models.common.geom.BezierCurve>; var lines : Array<models.common.geom.StraightLine>; };
	function getIntersection_bezierCurve(curve:models.common.geom.BezierCurve) : models.common.geom.BezierCurve.BezierCurvesIntersection;
	function isDegeneratedToPoint() : Bool;
	function getFirstPart(t:Float) : models.common.geom.BezierCurve;
	function getSecondPart(t:Float) : models.common.geom.BezierCurve;
	function getPart(t1:Float, t2:Float) : models.common.geom.BezierCurve;
	function split(tt:Array<Float>) : Array<models.common.geom.BezierCurve>;
	function translate(dx:Float, dy:Float) : models.common.geom.BezierCurve;
	function rotate(da:Float) : models.common.geom.BezierCurve;
	function clone() : models.common.geom.BezierCurve;
	function equ(curve:models.common.geom.BezierCurve) : Bool;
	function getReversed() : models.common.geom.BezierCurve;
	function reverse() : Void;
	function getLength() : Float;
	function getTangent(t:Float) : Float;
	function toString() : String;
}