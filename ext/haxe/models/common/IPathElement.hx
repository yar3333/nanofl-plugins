package models.common;

extern interface IPathElement extends models.common.ILayersContainer
{
	var visible : Bool;
	var matrix : models.common.geom.Matrix;
	function isScene() : Bool;
	function getNavigatorName() : String;
	function getNavigatorIcon() : String;
	function getChildren() : Array<models.common.elements.Element>;
	function createDisplayObject(frameIndexes:Array<{ var frameIndex : Int; var element : models.common.IPathElement; }>) : createjs.DisplayObject;
	function getTimeline() : models.common.ITimeline;
}