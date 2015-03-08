package nanofl.engine.fills;

extern class MatrixFill extends nanofl.engine.fills.BaseFill
{
	function new(matrix:nanofl.engine.geom.Matrix) : Void;
	var matrix : nanofl.engine.geom.Matrix;
	function clone() : nanofl.engine.fills.IFill;
	function getTransformed(m:nanofl.engine.geom.Matrix) : nanofl.engine.fills.IFill;
}