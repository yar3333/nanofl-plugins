package svgimport;

import htmlparser.HtmlNodeElement;
import nanofl.engine.elements.ShapeElement;
import svgimport.gradients.GradientType;
import svgimport.segments.DrawSegment;
import svgimport.segments.MoveSegment;
import svgimport.segments.QuadraticSegment;
import svgimport.segments.Segment;
using htmlparser.HtmlParserTools;

class SvgPath
{
	private static var SIN45 = 0.70710678118654752440084436210485;
	private static var TAN22 = 0.4142135623730950488016887242097;
	
	public var matrix : Matrix;
	public var name : String;
	public var alpha : Float;
	
	public var fill : FillType;
	public var fillAlpha : Float;
	
	public var stroke : StrokeType;
	public var strokeAlpha : Float;
	public var strokeWidth : Float;
	public var strokeCaps : String;
	public var strokeJoints : String;
	public var strokeMiterLimit : Float;

	public var segments : Array<Segment>;
	
	public function new(pathNode:HtmlNodeElement, baseStyles:Map<String, String>, gradients:Map<String, GradientType>, isRect:Bool, isEllipse:Bool, isCircle=false) : Void
	{
		matrix = Transform.load(pathNode.getAttribute("transform"));
		
		var styles = XmlTools.getStyles(pathNode, baseStyles);
		name = pathNode.getAttr("id", "");
		
		alpha = XmlTools.getFloatStyle(pathNode, "opacity", styles, 1.0);
		
		fill = XmlTools.getFillStyle(pathNode, "fill", styles,gradients);
		fillAlpha = XmlTools.getFloatStyle(pathNode, "fill-opacity", styles, 1.0);
		
		stroke = XmlTools.getStrokeStyle(pathNode, "stroke", styles, gradients);
		strokeAlpha = XmlTools.getFloatStyle(pathNode, "stroke-opacity", styles, 1.0);
		strokeWidth = XmlTools.getFloatStyle(pathNode, "stroke-width", styles, 1.0);
		strokeCaps = XmlTools.getStyle(pathNode, "stroke-linecap", styles, "butt");
		strokeJoints = XmlTools.getStyle(pathNode, "stroke-linejoin", styles, "miter");
		strokeMiterLimit = XmlTools.getFloatStyle(pathNode, "stroke-miterlimit", styles, 4.0);
		
		segments = [];

		if (isRect)
		{
			var x = pathNode.getAttrFloat("x", 0);
			var y = pathNode.getAttrFloat("y", 0);
			var w = pathNode.getAttrFloat("width", 0);
			var h = pathNode.getAttrFloat("height", 0);
			var rx = pathNode.getAttrFloat("rx", 0);
			var ry = pathNode.getAttrFloat("ry", rx);
			
			if (rx == 0 || ry == 0)
			{
				segments.push(new MoveSegment(x, y));
				segments.push(new DrawSegment(x + w, y));
				segments.push(new DrawSegment(x + w, y + h));
				segments.push(new DrawSegment(x, y + h));
				segments.push(new DrawSegment(x, y));
			}
			else
			{
				segments.push(new MoveSegment(x, y + ry));
				
				// top-left
				segments.push(new QuadraticSegment(x, y, x + rx, y));
				segments.push(new DrawSegment(x + w - rx, y));
				
				// top-right
				segments.push(new QuadraticSegment(x + w, y, x + w, y + rx));
				segments.push(new DrawSegment(x + w, y + h - ry));
				
				// bottom-right
				segments.push(new QuadraticSegment(x + w, y + h, x + w - rx, y + h));
				segments.push(new DrawSegment(x + rx, y + h));
				
				// bottom-left
				segments.push(new QuadraticSegment(x, y + h, x, y + h - ry));
				segments.push(new DrawSegment(x, y + ry));
			}
		}
		else if (isEllipse)
		{
			var x = pathNode.getAttrFloat("cx", 0);
			var y = pathNode.getAttrFloat("cy", 0);
			var r = pathNode.getAttrFloat("r", 0);
			var w = pathNode.getAttrFloat("rx", r);
			var w_ = w * SIN45;
			var cw_ = w * TAN22;
			var h = pathNode.getAttrFloat("ry", r);
			var h_ = h * SIN45;
			var ch_ = h * TAN22;
			
			segments.push(new MoveSegment(x + w, y));
			segments.push(new QuadraticSegment(x + w, y + ch_, x + w_, y + h_));
			segments.push(new QuadraticSegment(x + cw_, y + h, x, y + h));
			segments.push(new QuadraticSegment(x - cw_, y + h, x - w_, y + h_));
			segments.push(new QuadraticSegment(x - w, y + ch_, x - w, y));
			segments.push(new QuadraticSegment(x - w, y - ch_, x - w_, y - h_));
			segments.push(new QuadraticSegment(x - cw_, y - h, x, y - h));
			segments.push(new QuadraticSegment(x + cw_, y - h, x + w_, y - h_));
			segments.push(new QuadraticSegment(x + w, y - ch_, x + w, y));
			
			strokeCaps = "round";
			strokeJoints = "round";
		}
		else
		{
			var d : String;
			if (pathNode.hasAttribute("points"))
			{
				d = "M" + pathNode.getAttribute("points") + "z";
			}
			else
			if (pathNode.hasAttribute("x1"))
			{
				d = "M" + pathNode.getAttribute("x1") + ","
						+ pathNode.getAttribute("y1") + " "
						+ pathNode.getAttribute("x2") + ","
						+ pathNode.getAttribute("y2") + "z";
			}
			else
			{
				d = pathNode.getAttribute("d");
			}
			
			for (segment in SegmentsParser.run(d))
			{
				segments.push(segment);
			}
			
			strokeCaps = "round";
			strokeJoints = "round";
		}
	}
	
	public function toElement() : ShapeElement
	{
		if (segments.length == 0) return null;
		
		var exporter = new SvgPathExporter();
		
		if (fill != null && fill != FillType.FillNone)
		{
			exporter.beginFill(this);
			for (segment in segments) segment.export(exporter);
			exporter.endFill();
		}
		
		if (stroke != null && stroke != StrokeType.StrokeNone)
		{
			exporter.beginStroke(this);
			for (segment in segments) segment.export(exporter);
			exporter.endStroke();
		}
		
		var edgesAndPolygons = exporter.export();
		
		var shape = new ShapeElement(edgesAndPolygons.edges, edgesAndPolygons.polygons);
		
		if (!matrix.isIdentity())
		{
			shape.transform(matrix);
		}
		
		var effectiveStrokeAlpha = alpha * strokeAlpha;
		if (effectiveStrokeAlpha != 1.0)
		{
			for (edge in shape.edges) edge.stroke.applyAlpha(effectiveStrokeAlpha);
		}
		
		var effectiveFillAlpha = alpha * fillAlpha;		
		if (effectiveFillAlpha != 1.0)
		{
			for (polygon in shape.polygons) polygon.fill.applyAlpha(effectiveFillAlpha);
		}
		
		return shape;
	}
}
