package js.three;

@:flatEnum @:native("THREE.PathActions") extern enum PathActions
{
	QUADRATIC_CURVE_TO;
	ARC;
	CSPLINE_THRU;
	BEZIER_CURVE_TO;
	LINE_TO;
	ELLIPSE;
	MOVE_TO;
}