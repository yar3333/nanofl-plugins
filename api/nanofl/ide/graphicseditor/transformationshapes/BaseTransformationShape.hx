package nanofl.ide.graphicseditor.transformationshapes;

extern class BaseTransformationShape extends createjs.Container
{
	function new() : Void;
	var magnet : Bool;
	override function draw(ctx:js.html.CanvasRenderingContext2D, ?ignoreCache:Bool) : Bool;
}