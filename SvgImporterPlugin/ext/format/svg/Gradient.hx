package format.svg;

import models.common.geom.Matrix;
import format.display.GradientType;
import format.display.SpreadMethod;
import format.display.InterpolationMethod;
import format.display.CapsStyle;
import format.display.JointStyle;
import format.display.LineScaleMode;

class Gradient
{
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

	public var type : GradientType;
	public var colors : Array<Int>;
	public var alphas : Array<Float>;
	public var ratios : Array<Int>;
	public var matrix : Matrix;
	public var spread : SpreadMethod;
	public var interp : InterpolationMethod;
	public var focus : Float;
}

