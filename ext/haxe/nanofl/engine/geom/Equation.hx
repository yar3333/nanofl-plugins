package nanofl.engine.geom;

extern class Equation
{
	@:profile
	static function solveCube(a:Float, b:Float, c:Float, d:Float) : Array<Float>;
	@:profile
	static function solveQuadratic(a:Float, b:Float, c:Float) : Array<Float>;
}