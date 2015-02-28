package format.svg;

import stube.geom.Matrix;
import stube.display.GradientType;
import stube.display.SpreadMethod;
import stube.display.InterpolationMethod;
import stube.display.CapsStyle;
import stube.display.JointStyle;
import stube.display.LineScaleMode;

typedef PathSegments = Array<PathSegment>;

class Path
{
   public function new() { }

   public var matrix:Matrix;
   public var name:String;
   public var font_size:Float;
   public var fill:FillType;
   public var alpha:Float;
   public var fill_alpha:Float;
   public var stroke_alpha:Float;
   public var stroke_colour:Null<Int>;
   public var stroke_width:Float;
   public var stroke_caps:CapsStyle;
   public var joint_style:JointStyle;
   public var miter_limit:Float;

   public var segments:PathSegments;
}
