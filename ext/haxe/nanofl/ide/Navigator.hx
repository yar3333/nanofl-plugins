package nanofl.ide;

extern class Navigator
{
	var editPath(default, null) : Array<nanofl.ide.PathItem>;
	var pathItem(get, null) : nanofl.ide.PathItem;
	@:profile
	function navigateUp() : Void;
	@:profile
	function navigateDown(container:nanofl.engine.IPathElement) : Void;
	@:profile
	function navigateTo(editPath:Array<nanofl.ide.PathItem>, ?isCenterView:Bool) : Void;
	@:profile
	function update(isCenterView:Bool) : Void;
	@:profile
	function setLayerIndex(index:Int) : Void;
	@:profile
	function setFrameIndex(index:Int) : Void;
	function getInstanceNamePaths() : Array<String>;
}