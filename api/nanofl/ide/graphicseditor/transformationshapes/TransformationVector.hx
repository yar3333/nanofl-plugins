package nanofl.ide.graphicseditor.transformationshapes;

extern class TransformationVector extends nanofl.ide.graphicseditor.transformationshapes.BaseTransformationShape
{
	function new() : Void;
	var pt1(get, never) : nanofl.engine.geom.Point;
	var pt2(get, never) : nanofl.engine.geom.Point;
	var change(default, null) : stdlib.Event<nanofl.ide.graphicseditor.transformationshapes.TransformationVector.ChangeEventArgs>;
}