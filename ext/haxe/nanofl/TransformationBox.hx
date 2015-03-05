package nanofl;

typedef ResizeEventArgs =
{
	var kx : Float;
	var ky : Float;
	var regX : Float;
	var regY : Float;
};

typedef RotateEventArgs =
{
	var angle : Float;
	var regX : Float;
	var regY : Float;
};

extern class TransformationBox extends createjs.Container
{
	function new() : Void;
	var minWidth : Float;
	var minHeight : Float;
	var width : Float;
	var height : Float;
	var regPointX(get, set) : Float;
	var regPointY(get, set) : Float;
	var rotateCursorUrl : String;
	var resize(default, null) : stdlib.Event<nanofl.TransformationBox.ResizeEventArgs>;
	var rotate(default, null) : stdlib.Event<nanofl.TransformationBox.RotateEventArgs>;
	var moveRegPoint(default, null) : stdlib.Event<{ }>;
	var defaultRegPointX : Float;
	var defaultRegPointY : Float;
	var autoRegPoint : Bool;
	var disableRotation : Bool;
	var magnetOnRotate : Bool;
	var proportionalResize : Bool;
	override function draw(ctx:js.html.CanvasRenderingContext2D, ?ignoreCache:Bool) : Bool;
}