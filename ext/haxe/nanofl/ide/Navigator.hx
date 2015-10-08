package nanofl.ide;

extern class Navigator
{
	var editPath(default, null) : Array<nanofl.ide.PathItem>;
	var pathItem(default, never) : nanofl.ide.PathItem;
	function navigateUp() : Void;
	function navigateDown(container:nanofl.engine.IPathElement) : Void;
	function navigateTo(editPath:Array<nanofl.ide.PathItem>, ?isCenterView:Bool) : Void;
	function update(isCenterView:Bool) : Void;
	function setLayerIndex(index:Int) : Void;
	function setFrameIndex(index:Int, ?invalidater:nanofl.ide.Invalidater, ?commitBeforeChange:Bool) : Void;
	function getInstanceNamePaths() : Array<String>;
}