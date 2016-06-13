package js.three;

@:native("THREE.CurvePath") extern class CurvePath<T> extends js.three.Curve<T>
{
	function new() : Void;
	var curves : Array<js.three.Curve<T>>;
	var autoClose : Bool;
	function add(curve:js.three.Curve<T>) : Void;
	function checkConnection() : Bool;
	function closePath() : Void;
	function getCurveLengths() : Array<Float>;
	function createPointsGeometry(divisions:Int) : js.three.Geometry;
	function createSpacedPointsGeometry(divisions:Int) : js.three.Geometry;
	function createGeometry(points:Array<T>) : js.three.Geometry;
}