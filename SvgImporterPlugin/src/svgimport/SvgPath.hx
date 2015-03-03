package svgimport;

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
	
	public function export(exporter:SvgPathExporter) : Void
	{
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
	}
}
