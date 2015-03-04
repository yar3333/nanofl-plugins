package svgimport;

class Transform
{
	private static var mTranslateMatch = ~/translate\((.*)[, ](.*)\)/;
	private static var mMatrixMatch = ~/matrix\((.*)[, ](.*)[, ](.*)[, ](.*)[, ](.*)[, ](.*)\)/;
	private static var mScaleMatch = ~/scale\((.*)\)/;
	private static var mRotateMatch = ~/rotate\((.*)\)/;

	public static function apply(matrix:Matrix, trans:String) : Matrix
	{
		if (trans == null || trans == "") return matrix;
		
		var scale = 1.0;
		
		if (mTranslateMatch.match(trans))
		{
			matrix.translate(Std.parseFloat(mTranslateMatch.matched(1)), Std.parseFloat(mTranslateMatch.matched(2)));
		}
		else if (mScaleMatch.match(trans))
		{
			var s = Std.parseFloat(mScaleMatch.matched(1));
			matrix.scale(s, s);
			scale = s;
		}
		else if (mRotateMatch.match(trans))
		{
			matrix.rotate(Std.parseFloat(mRotateMatch.matched(1)) * 180 / Math.PI);
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