package svgimport;

import models.common.fills.IFill;
import models.common.fills.LinearFill;
import models.common.fills.RadialFill;
import models.common.fills.SolidFill;
import models.common.geom.Contour;
import models.common.geom.Edge;
import models.common.geom.Polygon;
import models.common.geom.StrokeEdge;
import models.common.strokes.IStroke;
import models.common.strokes.SolidStroke;

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
	
	public function endFill() isInFill = false;

	public function beginStroke(path:SvgPath)
	{
		if (path.strokeColor != null)
		{
			stroke = new SolidStroke
			(
				path.strokeColor,
				path.strokeWidth,
				path.strokeCaps,
				path.strokeJoints,
				path.strokeMiterLimit,
				false
			);
		}
		else
		{
			stroke = null;
		}
	}
	
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
}