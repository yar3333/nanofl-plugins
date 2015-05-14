package createjs;

import createjs.Rectangle;

@:expose
class GaussianBlurFilter extends createjs.Filter
{
    var radius : Int;
    
    public function new(radius:Int) : Void
	{
		super();
		
		this.radius = radius;
	}
	
	override function applyFilter(ctx:js.html.CanvasRenderingContext2D, x:Float, y:Float, width:Float, height:Float, ?targetCtx:js.html.CanvasRenderingContext2D, ?targetX:Float, ?targetY:Float) : Bool
	{
		StackBlur.stackBlurCanvasRGBA(ctx.canvas, x, y, width, height, radius);
		return true;
	}
	
	override public function getBounds(?rect:Rectangle) : Rectangle 
	{
		if (rect != null)
		{
			rect.x -= radius;
			rect.y -= radius;
			rect.width += radius * 2;
			rect.height += radius * 2;
			return rect;
		}
		
		return new Rectangle(-radius, -radius, radius * 2, radius * 2);
	}
	
	override function clone() : createjs.Filter return new GaussianBlurFilter(radius);
	
	override function toString() : String return "[GaussianBlurFilter]";
}