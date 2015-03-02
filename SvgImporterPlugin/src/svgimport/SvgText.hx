package svgimport;

import models.common.geom.Matrix;

class SvgText
{
   public var name : String;
   public var x : Float;
   public var y : Float;
   public var matrix : Matrix;
   public var text : String;
   public var fill : FillType;
   public var fill_alpha : Float;
   public var stroke_alpha : Float;
   public var stroke_colour : Null<Int>;
   public var stroke_width : Float;
   public var font_family : String;
   public var font_size : Float;
   public var kerning : Float;
   public var letter_spacing : Float;
   
   public function new() { }
}
