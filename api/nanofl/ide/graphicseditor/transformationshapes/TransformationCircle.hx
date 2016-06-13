package nanofl.ide.graphicseditor.transformationshapes;

extern class TransformationCircle extends nanofl.ide.graphicseditor.transformationshapes.BaseTransformationShape
{
	function new() : Void;
	var circleCenter(get, never) : nanofl.engine.geom.Point;
	var circleRadius : Float;
	var circleFocus(get, never) : nanofl.engine.geom.Point;
	var change(default, null) : stdlib.Event<nanofl.ide.graphicseditor.transformationshapes.TransformationCircle.ChangeEventArgs>;
}