package models.common;

extern interface ITimeline
{
	function addLayer(layer:models.common.Layer) : Void;
	function addLayersBlock(layersToAdd:Array<models.common.Layer>, ?index:Int) : Void;
	function removeLayers(index:Int) : Array<models.common.Layer>;
	function getTimelineState() : models.client.undo.states.TimelineState;
	function setTimelineState(state:models.client.undo.states.TimelineState) : Void;
}