package nanofl.engine;

extern interface IPathElement extends nanofl.engine.ILayersContainer
{
	var visible : Bool;
	var matrix : nanofl.engine.geom.Matrix;
	function isScene() : Bool;
	function getNavigatorName() : String;
	function getNavigatorIcon() : String;
	function getChildren() : Array<nanofl.engine.elements.Element>;
	function createDisplayObject(frameIndexes:Array<{ var frameIndex : Int; var element : nanofl.engine.IPathElement; }>) : createjs.DisplayObject;
	function getTimeline() : nanofl.engine.ITimeline;
}