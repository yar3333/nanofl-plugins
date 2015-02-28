package svg;

import models.common.geom.Matrix;
import display.GradientType;
import display.SpreadMethod;
import display.InterpolationMethod;
import display.CapsStyle;
import display.JointStyle;
import display.LineScaleMode;

class Gradient
{
	public var type : GradientType;
	public var colors : Array<Int>;
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

