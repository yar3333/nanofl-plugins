package nanofl.ide.graphicseditor.transformationshapes;

extern class TransformationBox extends nanofl.ide.graphicseditor.transformationshapes.BaseTransformationShape
{
	function new() : Void;
	var minWidth : Float;
	var minHeight : Float;
	var width : Float;
	var height : Float;
	var regPointX(get, set) : Float;
	var regPointY(get, set) : Float;
	var rotateCursorUrl : String;
	var resize(default, null) : stdlib.Event<nanofl.ide.graphicseditor.transformationshapes.TransformationBox.ResizeEventArgs>;
	var rotate(default, null) : stdlib.Event<nanofl.ide.graphicseditor.transformationshapes.TransformationBox.RotateEventArgs>;
	var changeRegPoint(default, null) : stdlib.Event<{ }>;
	var move(default, null) : stdlib.Event<nanofl.ide.graphicseditor.transformationshapes.TransformationBox.MoveEventArgs>;
	var barMove(default, null) : stdlib.Event<nanofl.ide.graphicseditor.transformationshapes.TransformationBox.BarMoveEventArgs>;
	var defaultRegPointX : Float;
	var defaultRegPointY : Float;
	var enableRegPoint : Bool;
	var enableRotatePoint : Bool;
	var enableTranslatePoint : Bool;
	var enableBars : Bool;
	var translatePointPositionX : String;
	var translatePointPositionY : String;
	var topBarPosition : Float;
	var rightBarPosition : Float;
	var bottomBarPosition : Float;
	var leftBarPosition : Float;
}