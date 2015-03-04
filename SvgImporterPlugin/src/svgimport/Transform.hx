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
					
				case "scale":
					var k = Std.parseFloat(re.matched(2));
					matrix.appendTransform(0, 0, k, k);
					
				case "rotate":
					matrix.appendTransform(0, 0, 1, 1, -Std.parseFloat(re.matched(2)));
					
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
					trace("Unknow tansform: '" + re.matched(1) + "'.");
			}
			
			trans = re.matchedRight();
		}
		
		return matrix;
	}
}