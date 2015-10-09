package svgimport;

import nanofl.engine.ColorTools;
import nanofl.engine.elements.TextElement;
import nanofl.engine.Layer;
import nanofl.engine.Library;
import nanofl.TextRun;
import svgimport.gradients.GradientType;
using StringTools;

class SvgTextExporter extends BaseExporter
{
	var text : SvgText;
	
	var layers : Array<Layer>;
	
	public function new(svg:Svg, library:Library, text:SvgText)
	{
		super(svg, library);
		this.text = text;
	}
	
	public function exportAsElement() : TextElement
	{
		var fillColor = switch (text.fill)
		{
			case FillType.FillNone: null;
			case FillType.FillSolid(color): color;
			case FillType.FillGrad(gradType): trace("Text gradients is not supported."); "#000000";
		};
		
		//trace(stdlib.Debug.getDump(this));
		
		var color = switch (text.stroke)
		{
			case StrokeType.StrokeSolid(c):	c;
			case StrokeType.StrokeNone:		null;
			case _:							"#000000";
		};
		
		var r = new TextElement(text.name, 0, 0, false, false, text.spans.map(exportSpan));
		r.matrix = text.matrix.clone();
		
		#if js
			
			var t : nanofl.TextField = cast r.createDisplayObject(null);
			
			var fontHeight = nanofl.TextField.measureFontHeight(text.fontFamily, text.fontStyle, text.fontSize);
			var fontBaselineCoef = nanofl.TextField.measureFontBaselineCoef(text.fontFamily, text.fontStyle);
			r.matrix.appendTransform(0, -fontHeight * fontBaselineCoef - nanofl.TextField.PADDING);
			
			switch (text.textAnchor)
			{
				case "middle":		r.matrix.appendTransform(-t.minWidth / 2, 0);
				case "end":			r.matrix.appendTransform(-t.minWidth + nanofl.TextField.PADDING, 0);
				case _:				r.matrix.appendTransform(-nanofl.TextField.PADDING, 0);
			}
			
		#else
			
			trace("Text-anchor in not supported on sys platform.");
			
		#end
		
		return r;
	}
	
	function exportSpan(span:SvgTextSpan) : TextRun
	{
		return TextRun.create
		(
			span.text,
			fillToColor(span.fill, span.fillAlpha),
			span.fontFamily,
			(span.fontWeight + span.fontStyle).trim(),
			span.fontSize,
			"left",
			span.strokeWidth,
			strokeToColor(span.stroke, span.strokeWidth),
			span.kerning == 0 && span.letterSpacing == 0,
			span.kerning + span.letterSpacing,
			0
		);
	}
	
	function strokeToColor(strokeType:StrokeType, alpha:Float) : String
	{
		switch (strokeType)
		{
			case StrokeType.StrokeNone: return "rgba(0,0,0,0)";
			case StrokeType.StrokeSolid(color): return ColorTools.colorToString(color, alpha);
			case StrokeType.StrokeGrad(grad): return gradientToColor(grad);
		}
		return null;
	}
	
	function fillToColor(fillType:FillType, alpha:Float) : String
	{
		switch (fillType)
		{
			case FillType.FillNone: return "rgba(0,0,0,0)";
			case FillType.FillSolid(color): return ColorTools.colorToString(color, alpha);
			case FillType.FillGrad(grad): return gradientToColor(grad);
		}
		return null;
	}
	
	function gradientToColor(grad:GradientType) : String
	{
		switch (grad)
		{
			case GradientType.LINEAR(grad):
				return ColorTools.colorToString(grad.colors[0], grad.alphas[0]);
			case GradientType.RADIAL(grad):
				return ColorTools.colorToString(grad.colors[0], grad.alphas[0]);
		}
		return null;
	}
}
