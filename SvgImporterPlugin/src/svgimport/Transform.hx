package svgimport;

class Transform
{
	private static var mTranslateMatch = ~/translate\((.*)[, ](.*)\)/;
	private static var mMatrixMatch = ~/matrix\((.*)[, ](.*)[, ](.*)[, ](.*)[, ](.*)[, ](.*)\)/;
	private static var mScaleMatch = ~/scale\((.*)\)/;

	public static function apply(matrix:Matrix, trans:String) : Matrix
	{
		var scale = 1.0;
		
		if (mTranslateMatch.match(trans))
		{
			// TODO: Pre-translate
			
			matrix.translate(Std.parseFloat(mTranslateMatch.matched(1)), Std.parseFloat(mTranslateMatch.matched(2)));
		}
		else if (mScaleMatch.match(trans))
		{
			// TODO: Pre-scale
			var s = Std.parseFloat(mScaleMatch.matched (1));
			matrix.scale (s, s);
			scale = s;
		}
		else if (mMatrixMatch.match(trans))
		{
			
			var m = new Matrix
			(
				Std.parseFloat(mMatrixMatch.matched(1)),
				Std.parseFloat(mMatrixMatch.matched(2)),
				Std.parseFloat(mMatrixMatch.matched(3)),
				Std.parseFloat(mMatrixMatch.matched(4)),
				Std.parseFloat(mMatrixMatch.matched(5)),
				Std.parseFloat(mMatrixMatch.matched(6))
			);
			
			m.appendMatrix(matrix);
			
			matrix.a = m.a;
			matrix.b = m.b;
			matrix.c = m.c;
			matrix.d = m.d;
			matrix.tx = m.tx;
			matrix.ty = m.ty;
			
			scale = Math.sqrt(matrix.a * matrix.a + matrix.c * matrix.c);
		}
		else
		{
			trace("Warning, unknown transform:" + trans);
		}
		
		return matrix;
	}
}