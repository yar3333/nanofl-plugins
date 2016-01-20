package js.three;

@:native("THREE.ArcCurve") extern class ArcCurve extends js.three.EllipseCurve
{
	function new(aX:Float, aY:Float, aRadius:Float, aStartAngle:Float, aEndAngle:Float, aClockwise:Bool) : Void;
}