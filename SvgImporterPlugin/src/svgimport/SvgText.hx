package svgimport;

import htmlparser.HtmlNodeElement;
import nanofl.engine.elements.TextElement;
import nanofl.TextRun;
import svgimport.gradients.GradientType;
using htmlparser.HtmlParserTools;
using svgimport.XmlTools;

class SvgText
{
	public var name : String;
   
	public var x : Float;
	public var y : Float;
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
   
	public function new(textNode:HtmlNodeElement, baseStyles:Map<String, String>, gradients:Map<String, GradientType>)
	{
		matrix = Transform.load(textNode.getAttribute("transform"));
		
		var styles = XmlTools.getStyles(textNode, baseStyles);
		
		name = textNode.getAttr("id", "");
		
		x = textNode.getFloatValue("x", 0);
		y = textNode.getFloatValue("y", 0);
		
		fill = XmlTools.getFillStyle(textNode, "fill", styles, gradients);
		fillAlpha = XmlTools.getFloatStyle(textNode, "fill-opacity", styles, 1);
		
		stroke = XmlTools.getStrokeStyle(textNode, "stroke", styles, gradients);
		strokeAlpha = XmlTools.getFloatStyle(textNode, "stroke-opacity", styles, 1);
		strokeWidth = XmlTools.getFloatStyle(textNode, "stroke-width", styles, 0);
		
		fontFamily = XmlTools.getStyle(textNode, "font-family", styles, "");
		fontSize = XmlTools.getFloatStyle(textNode, "font-size", styles, 12);
		fontStyle = XmlTools.getStyle(textNode, "font-style", styles, "");
		fontWeight = XmlTools.getStyle(textNode, "font-weight", styles, "");
		
		kerning = XmlTools.getFloatStyle(textNode, "kerning", styles, 0);
		letterSpacing = XmlTools.getFloatStyle(textNode, "letter-spacing", styles, 0);
		textAnchor = XmlTools.getStyle(textNode, "text-anchor", styles, "left");
		
		text = textNode.innerText;
	}
	
	public function toElement() : TextElement
	{
		var fillColor = switch (fill)
		{
			case FillType.FillNone: null;
			case FillType.FillSolid(color): color;
			case FillType.FillGrad(gradType): trace("Text gradients is not supported."); "#000000";
		};
		
		//trace(stdlib.Debug.getDump(this));
		
		var color = "#000000";
		switch (stroke)
		{
			case StrokeType.StrokeSolid(c): color = c;
			case _:
		}
		
		var r = new TextElement(name, 0, 0, false, false, [ TextRun.create
		(
			text,
			fillColor,
			fontFamily,
			"",
			fontSize,
			"left",
			strokeWidth,
			color,
			true,
			letterSpacing,
			0
		) ]);
		r.matrix = matrix.clone();
		r.matrix.translate(x, y);
		
		#if js
			
			var t : nanofl.TextField = cast r.createDisplayObject(null);
			
			var fontHeight = nanofl.TextField.measureFontHeight(fontFamily, fontStyle, fontSize);
			var fontBaselineCoef = nanofl.TextField.measureFontBaselineCoef(fontFamily, fontStyle);
			r.matrix.translate(0, -fontHeight * fontBaselineCoef - nanofl.TextField.PADDING);
			
			switch (textAnchor)
			{
				case "middle":		r.matrix.translate(-t.minWidth / 2, 0);
				case "end":			r.matrix.translate(-t.minWidth + nanofl.TextField.PADDING, 0);
				case _:				r.matrix.translate(-nanofl.TextField.PADDING, 0);
			}
			
		#else
			
			trace("Text-anchor in not supported on sys platform.");
			
		#end
		
		return r;
	}
}
