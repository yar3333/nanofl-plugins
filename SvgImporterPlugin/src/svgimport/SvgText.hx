package svgimport;

import htmlparser.HtmlNodeElement;
import nanofl.engine.geom.Matrix;
import svgimport.gradients.GradientType;
using htmlparser.HtmlParserTools;
using svgimport.XmlTools;

class SvgText
{
	public var name : String;
   
	public var matrix : Matrix;
   
	public var text : String;
   
	public var fill : FillType;
	public var fillAlpha : Float;
   
	public var stroke : StrokeType;
	public var strokeAlpha : Float;
	public var strokeWidth : Float;
   
	public var fontFamily : String;
	public var fontSize : Float;
	public var fontStyle : String;
	public var fontWeight : String;
   
	public var kerning : Float;
	public var letterSpacing : Float;
   
	public var textAnchor : String;
   
	public function new(node:HtmlNodeElement, baseStyles:Map<String, String>, gradients:Map<String, GradientType>)
	{
		matrix = Transform.load(node.getAttribute("transform"));
		
		var styles = XmlTools.getStyles(node, baseStyles);
		
		name = node.getAttr("id", "");
		
		var x = node.getFloatValue("x", 0);
		var y = node.getFloatValue("y", 0);
		if (x != 0 || y != 0) matrix.appendTransform(x, y);
		
		fill = XmlTools.getFillStyle(node, "fill", styles, gradients);
		fillAlpha = XmlTools.getFloatStyle(node, "fill-opacity", styles, 1);
		
		stroke = XmlTools.getStrokeStyle(node, "stroke", styles, gradients);
		strokeAlpha = XmlTools.getFloatStyle(node, "stroke-opacity", styles, 1);
		strokeWidth = XmlTools.getFloatStyle(node, "stroke-width", styles, 1);
		
		fontFamily = XmlTools.getStyle(node, "font-family", styles, "");
		fontSize = XmlTools.getFloatStyle(node, "font-size", styles, 12);
		fontStyle = XmlTools.getStyle(node, "font-style", styles, "");
		fontWeight = XmlTools.getStyle(node, "font-weight", styles, "");
		
		kerning = XmlTools.getFloatStyle(node, "kerning", styles, 0);
		letterSpacing = XmlTools.getFloatStyle(node, "letter-spacing", styles, 0);
		textAnchor = XmlTools.getStyle(node, "text-anchor", styles, "left");
		
		text = node.innerText;
	}
}
