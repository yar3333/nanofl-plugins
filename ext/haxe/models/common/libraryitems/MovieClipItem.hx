package models.common.libraryitems;

extern class MovieClipItem extends models.common.libraryitems.InstancableItem implements models.common.ITimeline implements models.common.ILayersContainer
{
	function new(namePath:String) : Void;
	var layers(default, never) : models.common.ArrayRO<models.common.Layer>;
	var likeButton : Bool;
	var autoPlay : Bool;
	var loop : Bool;
	override function getType() : String;
	override function clone() : models.common.libraryitems.LibraryItem;
	function addLayer(layer:models.common.Layer) : Void;
	/**
	 * Add block of layers into timeline.
	 * Assume that layers' parentIndex referenced inside block.
	 */
	function addLayersBlock(layersToAdd:Array<models.common.Layer>, ?index:Int) : Void;
	function removeLayers(index:Int) : Array<models.common.Layer>;
	function getFramesAt(frameIndex:Int) : Array<models.common.Frame>;
	override function removeInstance(namePath:String) : Void;
	override function swapInstance(oldNamePath:String, newNamePath:String) : Void;
	override function getIcon() : String;
	override function save(fileApi:models.common.FileApi) : Void;
	override function saveToXml(out:models.common.XmlWriter) : Void;
	function getTotalFrames() : Int;
	function getTimelineState() : models.client.undo.states.TimelineState;
	function setTimelineState(state:models.client.undo.states.TimelineState) : Void;
	override function createDisplayObject(initFrameIndex:Int, childFrameIndexes:Array<{ var frameIndex : Int; var element : models.common.IPathElement; }>) : nanofl.MovieClip;
	override function updateDisplayObject(dispObj:createjs.DisplayObject, childFrameIndexes:Array<{ var frameIndex : Int; var element : models.common.IPathElement; }>) : Void;
	override function hasInstance(namePath:String) : Bool;
	override function getUsedItems() : Array<models.common.libraryitems.LibraryItem>;
	override function getUsedFilters() : Array<String>;
	override function getDisplayObjectClassName() : String;
	override function toString() : String;
	static function load(namePath:String, libraryDir:String, fileApi:models.common.FileApi) : models.common.libraryitems.MovieClipItem;
	static function parse(namePath:String, movieClipNode:htmlparser.HtmlNodeElement) : models.common.libraryitems.MovieClipItem;
}