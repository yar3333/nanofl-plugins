package svgimport.segments;

class MoveSegment extends Segment
{
	override public function export(exporter:SvgPathExporter)
	{
		exporter.moveTo(x, y);
	}
	
	override public function getType() return SegmentType.MOVE(this);
}
