package gfx;

import display.GradientType;
import display.InterpolationMethod;
import display.SpreadMethod;
import models.common.geom.Matrix;

class Gradient
{
	public var type : GradientType;
	public var colors : Array<UInt>;
	public var alphas : Array<Float>;
	public var ratios : Array<Int>;
	public var matrix : Matrix;
	public var spread : SpreadMethod;
	public var interp : InterpolationMethod;
	public var focus : Float;
	
	public function new()
	{
		type = GradientType.LINEAR;
		colors = [];
		alphas = [];
		ratios = [];
		matrix = new Matrix();
		spread = SpreadMethod.PAD;
		interp = InterpolationMethod.RGB;
		focus = 0.0;
	}
}

