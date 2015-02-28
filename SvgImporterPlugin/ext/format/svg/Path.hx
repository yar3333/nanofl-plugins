package format.svg;

import format.display.GradientType;
import format.display.SpreadMethod;
import format.display.InterpolationMethod;
import format.display.CapsStyle;
import format.display.JointStyle;
import format.display.LineScaleMode;
import models.common.geom.Matrix;

typedef PathSegments = Array<PathSegment>;

class Path
{
	public function new() { }

	public var matrix : Matrix;
	public var name : String;
	public var font_size : Float;
	public var fill : FillType;
	public var alpha : Float;
	public var fill_alpha : Float;
	public var stroke_alpha : Float;
	public var stroke_colour : Null<Int>;
	public var stroke_width : Float;
	public var stroke_caps : CapsStyle;
	public var joint_style : JointStyle;
	public var miter_limit : Float;

	public var segments : PathSegments;
}
