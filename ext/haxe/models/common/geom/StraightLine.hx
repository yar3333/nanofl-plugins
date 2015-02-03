package models.common.geom;

extern class StraightLine
{
	function new(x1:Float, y1:Float, x2:Float, y2:Float) : Void;
	var x1 : Float;
	var y1 : Float;
	var x2 : Float;
	var y2 : Float;
	function getBounds() : models.common.geom.Bounds;
	function getNearestPoint(x:Float, y:Float) : { var point : models.common.geom.Point; var t : Float; };
	function getLength() : Float;
	function getIntersectionPointX_rightRay(mx:Float, my:Float) : Float;
	function isIntersect_rightRay(mx:Float, my:Float) : Bool;
	function getIntersection_straightSection(line:models.common.geom.StraightLine) : models.common.geom.Point;
	function toString() : String;
	function isDegeneratedToPoint() : Bool;
	function getFirstPart(t:Float) : models.common.geom.StraightLine;
	function getSecondPart(t:Float) : models.common.geom.StraightLine;
	function split(t:Float) : Array<models.common.geom.StraightLine>;
	function getPoint(t:Float) : models.common.geom.Point;
	function getTangent(t:Float) : Float;
}