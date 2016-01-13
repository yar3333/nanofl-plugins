package js.three;

/**
 * Defines a 2d shape plane using paths.
 */
@:native("THREE.Shape") extern class Shape extends js.three.Path
{
	function new(?points:Array<js.three.Vector2>) : Void;
	var holes : Array<js.three.Path>;
	function extrude(?options:Dynamic) : js.three.ExtrudeGeometry;
	function makeGeometry(?options:Dynamic) : js.three.ShapeGeometry;
	function getPointsHoles(divisions:Int) : Array<Array<js.three.Vector2>>;
	function extractAllPoints(divisions:Int) : { var holes : Array<Array<js.three.Vector2>>; var shape : Array<js.three.Vector2>; };
	function extractPoints(divisions:Int) : Array<js.three.Vector2>;
}