package models.client;

extern class Navigator
{
	var editPath(default, null) : Array<models.client.PathItem>;
	var pathItem(get, null) : models.client.PathItem;
	@:profile
	function navigateUp() : Void;
	@:profile
	function navigateDown(container:models.common.IPathElement) : Void;
	@:profile
	function navigateTo(editPath:Array<models.client.PathItem>, ?isCenterView:Bool) : Void;
	@:profile
	function update(isCenterView:Bool) : Void;
	@:profile
	function setLayerIndex(index:Int) : Void;
	@:profile
	function setFrameIndex(index:Int) : Void;
	function getInstanceNamePaths() : Array<String>;
}