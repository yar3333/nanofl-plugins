package models.common.fills;

extern class MatrixFill extends models.common.fills.BaseFill
{
	function new(matrix:models.common.geom.Matrix) : Void;
	var matrix : models.common.geom.Matrix;
}