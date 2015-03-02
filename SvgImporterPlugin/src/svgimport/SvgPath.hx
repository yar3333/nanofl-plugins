package svgimport;

import models.common.fills.LinearFill;
import models.common.fills.RadialFill;
import models.common.fills.SolidFill;
import models.common.strokes.SolidStroke;

class SvgPath
{
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
	
	public function new() { }
	
	public function export(exporter:PathExporter) : Void
	{
		switch (fill)
		{
			case FillType.FillSolid(color):
				exporter.beginFill(new SolidFill(color));
				
			case FillType.FillGrad(grad):
				if (grad.type == GradientType.LINEAR)
				{
					exporter.beginFill(new LinearFill(grad.colors, grad.ratios, grad.matrix));
					for (segment in segments) segment.export(exporter);
					exporter.endFill();
				}
				else
				if (grad.type == GradientType.RADIAL)
				{
					exporter.beginFill(new RadialFill(grad.colors, grad.ratios, grad.matrix));
					for (segment in segments) segment.export(exporter);
					exporter.endFill();
				}
				else
				{
					trace("Unknow grad type: " + grad.type);
				}
				
			case FillType.FillNone:
				// nothing to do
		}
		
		exporter.beginStroke(new SolidStroke(strokeColor, strokeWidth, strokeCaps, strokeJoints, strokeMiterLimit, false));
		for (segment in segments) segment.export(exporter);
		exporter.endStroke();
	}
}
