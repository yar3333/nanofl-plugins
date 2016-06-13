package js.three;

@:native("THREE.EllipseCurve") extern class EllipseCurve extends js.three.Curve<T>
{
	function new(aX:Float, aY:Float, xRadius:Float, yRadius:Float, aStartAngle:Float, aEndAngle:Float, aClockwise:Bool, aRotation:Float) : Void;
	var aX : Float;
	var aY : Float;
	var xRadius : Float;
	var yRadius : Float;
	var aStartAngle : Float;
	var aEndAngle : Float;
	var aClockwise : Bool;
	var aRotation : Float;
}