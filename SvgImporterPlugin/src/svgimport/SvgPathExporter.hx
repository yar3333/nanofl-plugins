package svgimport;

import nanofl.engine.fills.IFill;
import nanofl.engine.fills.LinearFill;
import nanofl.engine.fills.RadialFill;
import nanofl.engine.fills.SolidFill;
import nanofl.engine.geom.Contour;
import nanofl.engine.geom.Edge;
import nanofl.engine.geom.Polygon;
import nanofl.engine.geom.StrokeEdge;
import nanofl.engine.strokes.IStroke;
import nanofl.engine.strokes.SolidStroke;
import nanofl.engine.strokes.LinearStroke;
using StringTools;

class SvgPathExporter
{
	var isInFill = false;
	
	var edges(default, null) = new Array<StrokeEdge>();
	var polygons(default, null) = new Array<Polygon>();
	
	var stroke : IStroke = null;
	
	public var x(default, null) : Float = null;
	public var y(default, null) : Float = null;
	
	public function new() { }
	
	public function beginFill(path:SvgPath)
	{
		var fill : IFill = null;
		
		switch (path.fill)
		{
			case FillType.FillSolid(color):
				fill = new SolidFill(color);
				
			case FillType.FillGrad(grad):
				if (grad.type == GradientType.LINEAR)
				{
					fill = new LinearFill(grad.colors, grad.ratios, grad.matrix);
				}
				else
				if (grad.type == GradientType.RADIAL)
				{
					fill = new RadialFill(grad.colors, grad.ratios, grad.matrix);
				}
				else
				{
					trace("Unknow gradient type: " + grad.type);
				}
				
			case FillType.FillNone:
				// nothing to do
		}
		
		if (fill != null)
		{
			isInFill = true;
			polygons.push(new Polygon(fill));
		}
	}
	
	public function endFill()
	{
		if (isInFill)
		{
			closeContour();
			isInFill = false;
		}
	}

	public function beginStroke(path:SvgPath)
	{
		switch (path.stroke)
		{
			case StrokeType.StrokeNone:
				stroke = null;
				
			case StrokeType.StrokeSolid(color):
				stroke = new SolidStroke
				(
					color,
					path.strokeWidth,
					path.strokeCaps,
					path.strokeJoints,
					path.strokeMiterLimit,
					false
				);
				
			case StrokeType.StrokeGrad(grad):
				stroke = new LinearStroke
				(
					grad.colors,
					grad.ratios,
					grad.x1,
					grad.y1,
					grad.x2,
					grad.y2,
					path.strokeWidth,
					path.strokeCaps,
					path.strokeJoints,
					path.strokeMiterLimit,
					false
				);
		}
	}
	
	public function endStroke() { }
	
	public function moveTo(x:Float, y:Float) : Void
	{
		if (isInFill)
		{
			closeContour();
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
			if (stroke != null) edges.push(new StrokeEdge(this.x, this.y, x, y, stroke));
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
			if (stroke != null) edges.push(new StrokeEdge(this.x, this.y, controlX, controlY, anchorX, anchorY, stroke));
		}
		
		this.x = anchorX;
		this.y = anchorY;
	}
	
	public function export() : { edges:Array<StrokeEdge>, polygons:Array<Polygon> }
	{
		var polygons = []; for (p in this.polygons) polygons = polygons.concat(p.split());
		return { edges:edges, polygons:polygons };
	}
	
	function closeContour()
	{
		if (polygons.length > 0)
		{
			var contours = polygons[polygons.length - 1].contours;
			if (contours.length > 0)
			{
				var edges = contours[contours.length - 1].edges;
				if (edges.length > 0)
				{
					var edge1 = edges[0];
					var edge2 = edges[edges.length - 1];
					if (edge1.x1 != edge2.x3 || edge1.y1 != edge2.y3)
					{
						edges.push(new Edge(edge2.x3, edge2.y3, edge1.x1, edge1.y1));
					}
				}
			}
		}
	}
}