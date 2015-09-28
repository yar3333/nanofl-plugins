package nanofl.ide.commands;

extern class TimelineGroup extends nanofl.ide.commands.BaseGroup
{
	function new(app:nanofl.ide.Application) : Void;
	function insertFrame() : Void;
	function convertToKeyFrame() : Void;
	function addBlankKeyFrame() : Void;
	function removeFrames() : Void;
	function gotoPrevFrame() : Void;
	function gotoNextFrame() : Void;
	function createTween() : Void;
	function removeTween() : Void;
	function convertToKeyframe() : Void;
	function removeFrame() : Void;
	function switchLayerTypeToNormal() : Void;
	function switchLayerTypeToMask() : Void;
	function switchLayerTypeToMasked() : Void;
	function switchLayerTypeToGuide() : Void;
	function switchLayerTypeToGuided() : Void;
}