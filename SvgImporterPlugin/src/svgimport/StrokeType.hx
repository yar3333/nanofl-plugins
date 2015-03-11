package svgimport;

enum StrokeType
{
	StrokeNone;
	StrokeSolid(color:String);
	StrokeGrad(grad:Grad);
}

