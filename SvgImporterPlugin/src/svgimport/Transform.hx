package svgimport;

class Transform
{
	public static function load(trans:String) : Matrix
	{
		if (trans == null || trans == "") return new Matrix();
		
		var matrix = new Matrix();
		
		var re = ~/^\s*([a-zA-Z]+)\s*\(([^)]*)\)\s*/;
		while (re.match(trans))
		{
			var params = ~/[ \t\r\n,]+/g.split(re.matched(2));
			
			switch (re.matched(1))
			{
				case "translate":
					if (params.length == 2)
					{
						matrix.appendTransform(Std.parseFloat(params[0]), Std.parseFloat(params[1]));
					}
					else
					if (params.length == 1)
					{
						matrix.appendTransform(Std.parseFloat(params[0]), 0);
					}
					else
					{
						trace("Transform/translate: expect two params (" + params.length + ").");
					}
					
				case "scale":
					if (params.length > 0)
					{
						matrix.appendTransform(0, 0, Std.parseFloat(params[0]), params.length > 1 ? Std.parseFloat(params[1]) : Std.parseFloat(params[0]));
					}
					else
					{
						trace("Transform/scale: expect one or two params.");
					}
					
				case "rotate":
					if (params.length == 1)
					{
						matrix.appendTransform(0, 0, 1, 1, Std.parseFloat(params[0]));
					}
					else
					if (params.length == 2)
					{
						matrix.appendTransform( Std.parseFloat(params[1]),  0, 1, 1, 0);
						matrix.appendTransform(0, 0, 1, 1, Std.parseFloat(params[0]));
						matrix.appendTransform(-Std.parseFloat(params[1]), 0);
					}
					else
					if (params.length == 3)
					{
						matrix.appendTransform( Std.parseFloat(params[1]),  Std.parseFloat(params[2]), 1, 1, 0);
						matrix.appendTransform(0, 0, 1, 1, Std.parseFloat(params[0]));
						matrix.appendTransform(-Std.parseFloat(params[1]), -Std.parseFloat(params[2]));
					}
					
				case "matrix":
					if (params.length == 6)
					{
						matrix.append
						(
							Std.parseFloat(params[0]),
							Std.parseFloat(params[1]),
							Std.parseFloat(params[2]),
							Std.parseFloat(params[3]),
							Std.parseFloat(params[4]),
							Std.parseFloat(params[5])
						);
					}
					
				case _:
					trace("Unknow transform: '" + re.matched(1) + "'.");
			}
			
			trans = re.matchedRight();
		}
		
		return matrix;
	}
}