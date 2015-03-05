package svgimport;

class Gradient
{
	public var type : GradientType;
	public var colors : Array<String>;
	public var alphas : Array<Float>;
	public var ratios : Array<Float>;
	public var matrix : Matrix;
	public var focus : Float;
	
	public function new()
	{
		type = GradientType.LINEAR;
		colors = [];
		alphas = [];
		ratios = [];
		matrix = new Matrix();
		focus = 0.0;
	}
}
