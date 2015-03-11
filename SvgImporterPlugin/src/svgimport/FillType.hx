package svgimport;

enum FillType
{
	FillNone;
	FillSolid(color:String);
	FillGrad(grad:Grad);
}

