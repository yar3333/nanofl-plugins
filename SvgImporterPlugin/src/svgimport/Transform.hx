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
			switch (re.matched(1))
			{
				case "translate":
					var params = re.matched(2).split(",");
					if (params.length == 2)
					{
						matrix.appendTransform(Std.parseFloat(params[0]), Std.parseFloat(params[1]));
					}
					else
					{
						trace("Transform/translate: expect two params.");
					}
					
				case "scale":
					var params = re.matched(2).split(",").map(function(s) return Std.parseFloat(s));
					if (params.length > 0)
					{
						matrix.appendTransform(0, 0, params[0], params.length > 1 ? params[1] : params[0]);
					}
					else
					{
						trace("Transform/scale: expect one or two params.");
					}
					
				case "rotate":
					matrix.appendTransform(0, 0, 1, 1, Std.parseFloat(re.matched(2)));
					
				case "matrix":
					var params = re.matched(2).split(",");
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