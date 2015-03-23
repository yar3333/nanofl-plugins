package svgimport;

import nanofl.engine.KeyFrame;
import nanofl.engine.Layer;
import nanofl.engine.libraryitems.LibraryItem;
import nanofl.engine.libraryitems.MovieClipItem;
import svgimport.SvgElement;
import htmlparser.HtmlNodeElement;
import nanofl.engine.elements.ShapeElement;
import svgimport.gradients.GradientType;
import svgimport.segments.DrawSegment;
import svgimport.segments.MoveSegment;
import svgimport.segments.QuadraticSegment;
import svgimport.segments.Segment;
using htmlparser.HtmlParserTools;
using svgimport.XmlTools;

class SvgPath
{
	private static var SIN45 = 0.70710678118654752440084436210485;
	private static var TAN22 = 0.4142135623730950488016887242097;
	
	public var node : HtmlNodeElement;
	
	public var id : String;
	public var matrix : Matrix;
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
	
	public function new(node:HtmlNodeElement, baseStyles:Map<String, String>, elements:Map<String, SvgElement>, gradients:Map<String, GradientType>, ?id:String) : Void
	{
		this.node = node;
		
		var styles = XmlTools.getStyles(node, baseStyles);
		
		this.id = id != null ? id : node.getAttr("id", ""); if (this.id != "") elements.set(this.id, SvgElement.DisplayPath(this));
		matrix = Transform.load(node.getAttribute("transform"));
		alpha = XmlTools.getFloatStyle(node, "opacity", styles, 1.0);
		
		fill = XmlTools.getFillStyle(node, "fill", styles,gradients);
		fillAlpha = XmlTools.getFloatStyle(node, "fill-opacity", styles, 1.0);
		
		stroke = XmlTools.getStrokeStyle(node, "stroke", styles, gradients);
		strokeAlpha = XmlTools.getFloatStyle(node, "stroke-opacity", styles, 1.0);
		strokeWidth = XmlTools.getFloatStyle(node, "stroke-width", styles, 1.0);
		strokeCaps = XmlTools.getStyle(node, "stroke-linecap", styles, "butt");
		strokeJoints = XmlTools.getStyle(node, "stroke-linejoin", styles, "miter");
		strokeMiterLimit = XmlTools.getFloatStyle(node, "stroke-miterlimit", styles, 4.0);
		
		segments = [];
		
		switch (XmlTools.normalizeTag(node.name))
		{
			case "rect":
				var x = node.getFloatValue("x", 0);
				var y = node.getFloatValue("y", 0);
				var w = node.getFloatValue("width", 0);
				var h = node.getFloatValue("height", 0);
				var rx = node.getFloatValue("rx", 0);
				var ry = node.getFloatValue("ry", rx);
				
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
				
			case "ellipse", "circle":
				var x = node.getFloatValue("cx", 0);
				var y = node.getFloatValue("cy", 0);
				var r = node.getFloatValue("r", 0);
				var w = node.getFloatValue("rx", r);
				var w_ = w * SIN45;
				var cw_ = w * TAN22;
				var h = node.getFloatValue("ry", r);
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
				
			case _:
				var d : String;
				if (node.hasAttribute("points"))
				{
					d = "M" + node.getAttribute("points") + "z";
				}
				else
				if (node.hasAttribute("x1"))
				{
					d = "M" + node.getAttribute("x1") + ","
							+ node.getAttribute("y1") + " "
							+ node.getAttribute("x2") + ","
							+ node.getAttribute("y2") + "z";
				}
				else
				{
					d = node.getAttribute("d");
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
		if (effectiveStrokeAlpha != 1.0 && shape.edges.length > 0)
		{
			shape.edges[0].stroke.applyAlpha(effectiveStrokeAlpha);
		}
		
		var effectiveFillAlpha = alpha * fillAlpha;		
		if (effectiveFillAlpha != 1.0 && shape.polygons.length > 0)
		{
			shape.polygons[0].fill.applyAlpha(effectiveFillAlpha);
		}
		
		return shape;
	}
	
	public function toLibraryItem() : LibraryItem
	{
		var element = toElement();
		if (element == null) return null;
		var mc = new MovieClipItem(id);
		mc.addLayer(new Layer("auto"));
		mc.layers[0].addKeyFrame(new KeyFrame([ element ]));
		return mc;
	}
}
