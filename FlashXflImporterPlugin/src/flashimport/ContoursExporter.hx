package flashimport;

import nanofl.engine.fills.IFill;
import nanofl.engine.geom.Contour;
import nanofl.engine.geom.Edge;
import nanofl.engine.geom.Polygon;
import nanofl.engine.geom.StrokeEdge;
import nanofl.engine.strokes.IStroke;

class ContoursExporter
{
	var isInFill = false;
	
	var strokes : Array<IStroke>;
	var fills : Array<IFill>;
	
	public var edges(default, null) = new Array<StrokeEdge>();
	public var polygons(default, null) = new Array<Polygon>();
	
	var stroke : IStroke = null;
	var x : Float = null;
	var y : Float = null;
	
	public function new(strokes:Array<IStroke>, fills:Array<IFill>)
	{
		this.strokes = strokes;
		this.fills = fills;
	}
	
	public function beginFill(n:Int)
	{
		isInFill = true;
		polygons.push(new Polygon(fills[n]));
	}
	
	public function endFill() isInFill = false;

	public function beginStroke(n:Int) stroke = strokes[n];
	public function endStroke() { }
	
	public function moveTo(x:Float, y:Float) : Void
	{
		if (isInFill)
		{
			polygons[polygons.length - 1].contours.push(new Contour([]));
		}
		
		this.x = x;
		this.y = y;
	}
	
	public function lineTo(x:Float, y:Float) : Void
	{
		if (isInFill)
		{
			var contours = polygons[polygons.length - 1].contours;
			contours[contours.length - 1].edges.push(new Edge(this.x, this.y, x, y));
		}
		else
		{
			edges.push(new StrokeEdge(this.x, this.y, x, y, stroke));
		}
		
		this.x = x;
		this.y = y;
	}
	
	public function curveTo(controlX:Float, controlY:Float, anchorX:Float, anchorY:Float) : Void
	{
		if (isInFill)
		{
			var contours = polygons[polygons.length - 1].contours;
			contours[contours.length - 1].edges.push(new Edge(this.x, this.y, controlX, controlY, anchorX, anchorY));
		}
		else
		{
			edges.push(new StrokeEdge(this.x, this.y, controlX, controlY, anchorX, anchorY, stroke));
		}
		
		this.x = anchorX;
		this.y = anchorY;
	}
	
	public function export() : { edges:Array<StrokeEdge>, polygons:Array<Polygon> }
	{
		var polygons = []; for (p in this.polygons) polygons = polygons.concat(p.split());
		return { edges:edges, polygons:polygons };
	}
	
	public function beginShape() { }
	public function endShape() { }
	public function beginFills() : Void {}
	public function endFills() : Void {}
	public function beginStrokes() : Void {}
	public function endStrokes() : Void {}
}