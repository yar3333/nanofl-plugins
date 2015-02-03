package models.common.geom;

extern class PointTools
{
	static function half(pt:models.common.geom.Point) : models.common.geom.Point;
	static function round(pt:models.common.geom.Point) : models.common.geom.Point;
	static function normalize(pt:models.common.geom.Point) : models.common.geom.Point;
	static function getLength(pt:models.common.geom.Point) : Float;
	@:noUsing
	static function getDist(x1:Float, y1:Float, x2:Float, y2:Float) : Float;
	@:noUsing
	static function getSqrDist(x1:Float, y1:Float, x2:Float, y2:Float) : Float;
	static function getDistP(a:models.common.geom.Point, b:models.common.geom.Point) : Float;
	static function getSqrDistP(a:models.common.geom.Point, b:models.common.geom.Point) : Float;
	@:noUsing
	static function rotate(x:Float, y:Float, da:Float) : models.common.geom.Point;
	static function moveInDirection(start:models.common.geom.Point, endX:Float, endY:Float, len:Float) : models.common.geom.Point;
	static function equ(pt1:models.common.geom.Point, pt2:models.common.geom.Point) : Bool;
	static function clone(pt:models.common.geom.Point) : models.common.geom.Point;
	@:noUsing
	static function round100(n:Float) : Float;
	static function toString(pt:models.common.geom.Point) : String;
	static function getNearest(pt:models.common.geom.Point, points:Array<models.common.geom.Point>) : models.common.geom.Point;
}