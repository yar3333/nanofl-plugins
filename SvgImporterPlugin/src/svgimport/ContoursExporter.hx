package svgimport;

import models.common.fills.IFill;
import models.common.geom.Contour;
import models.common.geom.Edge;
import models.common.geom.Polygon;
import models.common.geom.StrokeEdge;
import models.common.strokes.IStroke;

class ContoursExporter
{
	var isInFill = false;
	
	var strokes = new Array<IStroke>();
	var fills = new Array<IFill>();
	
	public var edges(default, null) = new Array<StrokeEdge>();
	public var polygons(default, null) = new Array<Polygon>();
	
	var stroke : IStroke = null;
	
	public var x(default, null) : Float = null;
	public var y(default, null) : Float = null;
	
	public function new() { }
	
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
}