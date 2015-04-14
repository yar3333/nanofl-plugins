package nanofl.engine.geom;

extern class StraightLine
{
	function new(x1:Float, y1:Float, x2:Float, y2:Float) : Void;
	var x1 : Float;
	var y1 : Float;
	var x2 : Float;
	var y2 : Float;
	function clone() : nanofl.engine.geom.StraightLine;
	function getBounds() : nanofl.engine.geom.Bounds;
	function getNearestPoint(x:Float, y:Float) : { var point : nanofl.engine.geom.Point; var t : Float; };
	function getLength() : Float;
	function getIntersectionPointX_rightRay(mx:Float, my:Float) : Float;
	function isIntersect_rightRay(mx:Float, my:Float) : Bool;
	function getIntersection_straightSection(line:nanofl.engine.geom.StraightLine) : nanofl.engine.geom.Point;
	function isDegeneratedToPoint() : Bool;
	function getFirstPart(t:Float) : nanofl.engine.geom.StraightLine;
	function getSecondPart(t:Float) : nanofl.engine.geom.StraightLine;
	function split(tt:Array<Float>) : Array<nanofl.engine.geom.StraightLine>;
	function getPoint(t:Float) : nanofl.engine.geom.Point;
	function getTangent(t:Float) : Float;
	function isLiesOnLine(long:nanofl.engine.geom.StraightLine) : Bool;
	function toString() : String;
}