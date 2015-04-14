package nanofl.engine.geom;

extern class BoundsTools
{
	static function updateByRect(bounds:nanofl.engine.geom.Bounds, rect:{ var height : Float; var width : Float; var x : Float; var y : Float; }) : nanofl.engine.geom.Bounds;
	static function isIntersect(a:nanofl.engine.geom.Bounds, b:nanofl.engine.geom.Bounds) : Bool;
}