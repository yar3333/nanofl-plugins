package svgimport;

import nanofl.engine.geom.Polygons;
import nanofl.engine.ColorTools;
import nanofl.engine.fills.LinearFill;
import nanofl.engine.fills.RadialFill;
import nanofl.engine.fills.SolidFill;
import nanofl.engine.geom.Contour;
import nanofl.engine.geom.Edge;
import nanofl.engine.geom.Polygon;
import nanofl.engine.geom.StrokeEdge;
import nanofl.engine.strokes.IStroke;
import nanofl.engine.strokes.LinearStroke;
import nanofl.engine.strokes.SolidStroke;
import svgimport.gradients.Gradient;
import svgimport.gradients.GradientType;
using StringTools;
using Lambda;

class SvgPathExporter
{
	var edges(default, null) = new Array<StrokeEdge>();
	var polygonAndFillRules(default, null) = new Array<{ polygon:Polygon, fillRuleEvenOdd:Bool }>();
	
	var stroke : IStroke = null;
	var fillPath : SvgPath = null;
	
	public var x(default, null) : Float = null;
	public var y(default, null) : Float = null;
	
	public function new() { }
	
	public function beginFill(path:SvgPath)
	{
		fillPath = path.fill != FillType.FillNone ? path : null;
		polygonAndFillRules.push({ polygon:new Polygon(null), fillRuleEvenOdd:path.fillRuleEvenOdd });
	}
	
	public function endFill()
	{
		if (fillPath != null)
		{
			closeContour();
			
			var polygon = polygonAndFillRules[polygonAndFillRules.length - 1].polygon;
			
			switch (fillPath.fill)
			{
				case FillType.FillSolid(color):
					polygon.fill = new SolidFill(color);
					
				case FillType.FillGrad(gradType):
					var bounds = polygon.getBounds();
					polygon.fill = switch (gradType)
					{
						case GradientType.LINEAR(grad): new LinearFill(getGradientRgbaColors(grad), grad.ratios, grad.getFullMatrix(bounds));
						case GradientType.RADIAL(grad): new RadialFill(getGradientRgbaColors(grad), grad.ratios, grad.getFullMatrix(bounds));
					};
					
				case FillType.FillNone:
					// nothing to do
			}
			
			fillPath = null;
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
				
			case StrokeType.StrokeGrad(gradType):
				switch (gradType)
				{
					case GradientType.LINEAR(grad):
						stroke = new LinearStroke
						(
							getGradientRgbaColors(grad),
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
						
					case _:
						trace("Stroke: not linear gradients are not supported.");
						stroke = new SolidStroke("#000000");
				};
		}
	}
	
	public function endStroke() { }
	
	public function moveTo(x:Float, y:Float) : Void
	{
		if (fillPath != null)
		{
			closeContour();
			polygonAndFillRules[polygonAndFillRules.length - 1].polygon.contours.push(new Contour([]));
		}
		
		this.x = x;
		this.y = y;
	}
	
	public function lineTo(x:Float, y:Float) : Void
	{
		if (fillPath != null)
		{
			var contours = polygonAndFillRules[polygonAndFillRules.length - 1].polygon.contours;
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
		if (fillPath != null)
		{
			var contours = polygonAndFillRules[polygonAndFillRules.length - 1].polygon.contours;
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
		var polygons = [];
		for (pf in polygonAndFillRules)
		{
			polygons = polygons.concat(Polygons.fromEdges(pf.polygon.getEdges(), pf.polygon.fill, pf.fillRuleEvenOdd));
		}
		return { edges:edges, polygons:polygons };
	}
	
	function closeContour()
	{
		var contours = polygonAndFillRules[polygonAndFillRules.length - 1].polygon.contours;
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
	
	function getGradientRgbaColors(grad:Gradient) : Array<String>
	{
		return grad.colors.mapi(function(i, c) return ColorTools.colorToString(c, grad.alphas[i])).array();
	}
}