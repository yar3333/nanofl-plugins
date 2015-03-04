package svgimport;

import models.common.elements.ShapeElement;
import svgimport.Segment;

class SvgPath
{
	private static var SIN45 = 0.70710678118654752440084436210485;
	private static var TAN22 = 0.4142135623730950488016887242097;
	
	public var matrix : Matrix;
	public var name : String;
	public var alpha : Float;
	
	public var fill : FillType;
	public var fillAlpha : Float;
	
	public var strokeAlpha : Float;
	public var strokeColor : String;
	public var strokeWidth : Float;
	public var strokeCaps : String;
	public var strokeJoints : String;
	public var strokeMiterLimit : Float;

	public var segments : Array<Segment>;
	
	public function new(pathNode:Xml, mat:Matrix, prevStyles:Map<String, String>, gradients:Map<String, Grad>, pathParser:SvgPathParser, isRect:Bool, isEllipse:Bool, isCircle=false) : Void
	{
		//trace("\t\tloadPath isRect = " + isRect + "; isEllipse = " + isEllipse+"; isCircle = " + isCircle);
		
		matrix = mat.clone();
		
		Transform.apply(matrix, pathNode.get("transform"));
		
		var styles = XmlTools.getStyles(pathNode, prevStyles, gradients);
		name = pathNode.exists("id") ? pathNode.get("id") : "";
		
		alpha = XmlTools.getFloatStyle(pathNode, "opacity", styles, 1.0);
		fill = XmlTools.getFillStyle(pathNode, "fill", styles,gradients);
		fillAlpha = XmlTools.getFloatStyle(pathNode, "fill-opacity", styles, 1.0);
		strokeAlpha = XmlTools.getFloatStyle(pathNode, "stroke-opacity", styles, 1.0);
		strokeColor = XmlTools.getStrokeStyle(pathNode, "stroke", styles, null);
		strokeWidth = XmlTools.getFloatStyle(pathNode, "stroke-width", styles, 1.0);
		strokeCaps = "round";
		strokeJoints = "round";
		strokeMiterLimit = XmlTools.getFloatStyle(pathNode, "stroke-miterlimit", styles, 3.0);
		segments = [];

		if (isRect)
		{
			var x = pathNode.exists("x") ? Std.parseFloat(pathNode.get("x")) : 0;
			var y = pathNode.exists("y") ? Std.parseFloat(pathNode.get("y")) : 0;
			var w = Std.parseFloat(pathNode.get("width"));
			var h = Std.parseFloat(pathNode.get("height"));
			var rx = pathNode.exists("rx") ? Std.parseFloat(pathNode.get("rx")) : 0.0;
			var ry = pathNode.exists("ry") ? Std.parseFloat(pathNode.get("ry")) : 0.0;
			
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
			var x = pathNode.exists("cx") ? Std.parseFloat(pathNode.get("cx")) : 0;
			var y = pathNode.exists("cy") ? Std.parseFloat(pathNode.get("cy")) : 0;
			var r = isCircle && pathNode.exists("r") ? Std.parseFloat(pathNode.get("r")) : 0.0;
			var w = isCircle ? r : (pathNode.exists("rx") ? Std.parseFloat(pathNode.get("rx")) : 0.0);
			var w_ = w * SIN45;
			var cw_ = w * TAN22;
			var h = isCircle ? r : (pathNode.exists("ry") ? Std.parseFloat(pathNode.get("ry")) : 0.0);
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
		}
		else
		{
			var d = pathNode.exists("points") ? ("M" + pathNode.get("points") + "z") :
					pathNode.exists("x1") ? ("M" + pathNode.get("x1") + "," + pathNode.get("y1") + " " + pathNode.get("x2") + "," + pathNode.get("y2") + "z") :
					pathNode.get("d");
			
			for (segment in pathParser.parse(d))
			{
				segments.push(segment);
			}
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
		
		if (strokeColor != null && strokeColor != "")
		{
			exporter.beginStroke(this);
			for (segment in segments) segment.export(exporter);
			exporter.endStroke();
		}
		
		var edgesAndPolygons = exporter.export();
		
		var shape = new ShapeElement(edgesAndPolygons.edges, edgesAndPolygons.polygons);
		if (!matrix.isIdentity()) shape.transform(matrix);
		
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
