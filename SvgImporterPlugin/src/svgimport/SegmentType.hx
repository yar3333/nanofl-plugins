package svgimport;

import svgimport.Segment;

enum SegmentType 
{
	MOVE(seg:MoveSegment);
	DRAW(seg:DrawSegment);
	CURVE(seg:QuadraticSegment);
	CUBIC(seg:CubicSegment);
	ARC(seg:ArcSegment);
}