package createjs;

@:expose
class QuatizeColorsFilter extends createjs.Filter
{
	/**
	 * From 2 to 256. Defaults is 16;
	 */
	var colors : Int;

	public function new(?colors:Int) : Void
	{
		super();
		this.colors = colors != null ? colors : 16;
	}
	
	override function applyFilter(ctx:js.html.CanvasRenderingContext2D, x:Float, y:Float, width:Float, height:Float, ?targetCtx:js.html.CanvasRenderingContext2D, ?targetX:Float, ?targetY:Float) : Bool
	{
		var imageData = ctx.getImageData(x, y, width, height);
		
		var q = new RgbQuant
		({
			colors: colors
		});
		
		q.sample(imageData);
		imageData.data.set(q.reduceAsTypedArray(imageData));
		ctx.putImageData(imageData, x, y);
		
		return true;
	}
	
	override function clone() return new QuatizeColorsFilter(colors);
	
	override function toString() return "QuatizeColorsFilter(" + colors + ")";
}