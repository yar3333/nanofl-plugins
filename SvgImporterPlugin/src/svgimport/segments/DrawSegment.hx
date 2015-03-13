package svgimport.segments;

class DrawSegment extends Segment
{
	override public function export(exporter:SvgPathExporter)
	{
		exporter.lineTo(x, y);
	}

	override public function getType() return SegmentType.DRAW(this);
}
