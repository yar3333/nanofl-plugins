package createjs;

@:expose
class QuatizeColorsFilter extends createjs.Filter
{
	/**
	 * From 2 to 256. Defaults is 16;
	 */
	var maxColors : Int;

	public function new(?maxColors:Int) : Void
	{
		super();
		
		this.maxColors = maxColors != null ? maxColors : 16;
	}
	
	override function applyFilter(ctx:js.html.CanvasRenderingContext2D, x:Float, y:Float, width:Float, height:Float, ?targetCtx:js.html.CanvasRenderingContext2D, ?targetX:Float, ?targetY:Float) : Bool
	{
		var imageData = ctx.getImageData(x, y, width, height);
		
		var q = new RgbQuant
		({
			colors: maxColors
		});
		
		var r = q.reduceAsTypedArray(imageData);
		
		for (i in 0...r.length) imageData.data[i] = r[i];
		
		return true;
	}
	
	override function clone() return new QuatizeColorsFilter(maxColors);
	
	override function toString() return "QuatizeColorsFilter(" + maxColors + ")";
}