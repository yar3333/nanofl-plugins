package nanofl.engine;

extern interface ITimeline
{
	function addLayer(layer:nanofl.engine.Layer) : Void;
	function addLayersBlock(layersToAdd:Array<nanofl.engine.Layer>, ?index:Int) : Void;
	function removeLayer(index:Int) : Void;
	function removeLayerWithChildren(index:Int) : Array<nanofl.engine.Layer>;
	function getTimelineState() : nanofl.ide.undo.states.TimelineState;
	function setTimelineState(state:nanofl.ide.undo.states.TimelineState) : Void;
}