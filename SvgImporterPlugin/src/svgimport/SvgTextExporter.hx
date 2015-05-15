package svgimport;

import nanofl.engine.elements.TextElement;
import nanofl.engine.Layer;
import nanofl.engine.Library;
import nanofl.TextRun;

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
		
		var r = new TextElement(text.name, 0, 0, false, false, [ TextRun.create
		(
			text.text,
			fillColor,
			text.fontFamily,
			"",
			text.fontSize,
			"left",
			text.strokeWidth,
			color,
			true,
			text.letterSpacing,
			0
		) ]);
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
}
