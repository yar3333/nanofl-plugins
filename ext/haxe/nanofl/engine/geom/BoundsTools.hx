package nanofl.engine.geom;

extern class BoundsTools
{
	static function extendR(bounds:nanofl.engine.geom.Bounds, rect:{ var height : Float; var width : Float; var x : Float; var y : Float; }) : nanofl.engine.geom.Bounds;
	static function extend(bounds:nanofl.engine.geom.Bounds, b:nanofl.engine.geom.Bounds) : nanofl.engine.geom.Bounds;
	static function isIntersect(a:nanofl.engine.geom.Bounds, b:nanofl.engine.geom.Bounds, ?gap:Float) : Bool;
	static function isPointInside(bounds:nanofl.engine.geom.Bounds, x:Float, y:Float, ?gap:Float) : Bool;
	static function clone(bounds:nanofl.engine.geom.Bounds) : nanofl.engine.geom.Bounds;
	static function toString(bounds:nanofl.engine.geom.Bounds) : String;
	static function toRectangle(bounds:nanofl.engine.geom.Bounds) : createjs.Rectangle;
}