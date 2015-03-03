package svgimport;

import models.common.elements.TextElement;
import nanofl.TextRun;

class SvgText
{
	public var name : String;
   
	public var x : Float;
	public var y : Float;
	public var matrix : Matrix;
   
	public var text : String;
   
	public var fill : FillType;
	public var fillAlpha : Float;
   
	public var strokeAlpha : Float;
	public var strokeColor : String;
	public var strokeWidth : Float;
   
	public var fontFamily : String;
	public var fontSize : Float;
	public var fontStyle : String;
	public var fontWeight : String;
   
	public var kerning : Float;
	public var letterSpacing : Float;
   
	public var textAnchor : String;
   
	public function new(textNode:Xml, mat:Matrix, prevStyles:Map<String, String>, gradients:Map<String, Grad>)
	{
		matrix = mat.clone();
		
		if (textNode.exists("transform"))
		{
			Transform.apply(matrix, textNode.get("transform"));
		}
		
		var styles = XmlTools.getStyles(textNode, prevStyles, gradients);
		
		name = textNode.exists("id") ? textNode.get("id") : "";
		
		x = XmlTools.getFloat(textNode, "x", 0.0);
		y = XmlTools.getFloat(textNode, "y", 0.0);
		
		fill = XmlTools.getFillStyle(textNode, "fill", styles, gradients);
		fillAlpha = XmlTools.getFloatStyle(textNode, "fill-opacity", styles, 1.0);
		
		strokeAlpha = XmlTools.getFloatStyle(textNode, "stroke-opacity", styles, 1.0);
		strokeColor = XmlTools.getStrokeStyle(textNode, "stroke", styles, null);
		strokeWidth = XmlTools.getFloatStyle(textNode, "stroke-width", styles, 1.0);
		
		fontFamily = XmlTools.getStyle(textNode, "font-family", styles, "");
		fontSize = XmlTools.getFloatStyle(textNode, "font-size", styles, 12);
		fontStyle = XmlTools.getStyle(textNode, "font-style", styles, "");
		fontWeight = XmlTools.getStyle(textNode, "font-weight", styles, "");
		
		kerning = XmlTools.getFloatStyle(textNode, "kerning", styles, 0);
		letterSpacing = XmlTools.getFloatStyle(textNode, "letter-spacing", styles, 0);
		textAnchor = textNode.exists("text-anchor") ? textNode.get("text-anchor") : "";
		
		text = ""; for (el in textNode) text += el.nodeValue;
	}
	
	public function toTextElement() : TextElement
	{
		var fillColor = switch (fill)
		{
			case FillType.FillNone: null;
			case FillType.FillSolid(color): color;
			case FillType.FillGrad(grad): trace("Text gradients is not supported."); grad.colors[0];
		};
		
		//trace(stdlib.Debug.getDump(this));
		
		var r = new TextElement(name, 0, 0, false, false, [ new TextRun(text, fillColor, fontFamily, "", fontSize, "left", strokeWidth, strokeColor, null) ], null);
		r.matrix = matrix.clone();
		r.matrix.translate(x, y);
		
		if (textAnchor != "" && textAnchor != "start")
		{
			#if js
			var t : nanofl.TextField = cast r.createDisplayObject(null);
			if (textAnchor == "middle")
			{
				var fontHeight = nanofl.TextField.measureFontHeight(fontFamily, fontStyle, fontSize);
				var fontBaselineCoef = nanofl.TextField.measureFontBaselineCoef(fontFamily, fontStyle);
				r.matrix.translate( -t.minWidth / 2, -fontHeight * fontBaselineCoef - nanofl.TextField.PADDING);
			}
			#else
			trace("Text-anchor in not supported on sys platform.");
			#end
		}
		
		return r;
	}
}
