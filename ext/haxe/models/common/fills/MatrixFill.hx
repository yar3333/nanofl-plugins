package models.common.fills;

extern class MatrixFill extends models.common.fills.BaseFill
{
	function new(matrix:models.common.geom.Matrix) : Void;
	var matrix : models.common.geom.Matrix;
	function clone() : models.common.fills.IFill;
	function getTransformed(m:models.common.geom.Matrix) : models.common.fills.IFill;
}