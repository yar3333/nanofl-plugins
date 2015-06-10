package nanofl.engine.libraryitems;

extern class MovieClipItem extends nanofl.engine.libraryitems.InstancableItem implements nanofl.engine.ITextureItem implements nanofl.engine.ISpriteSheetableItem implements nanofl.engine.IFramedItem implements nanofl.engine.ITimeline implements nanofl.engine.ILayersContainer
{
	function new(namePath:String) : Void;
	var layers(default, never) : nanofl.engine.ArrayRO<nanofl.engine.Layer>;
	var likeButton : Bool;
	var autoPlay : Bool;
	var loop : Bool;
	var exportAsSpriteSheet : Bool;
	var textureAtlas : String;
	override function getType() : String;
	override function clone() : nanofl.engine.libraryitems.LibraryItem;
	function addLayer(layer:nanofl.engine.Layer) : Void;
	/**
	 * Add block of layers into timeline.
	 * Assume that layers' parentIndex referenced inside block.
	 */
	function addLayersBlock(layersToAdd:Array<nanofl.engine.Layer>, ?index:Int) : Void;
	function removeLayers(index:Int) : Array<nanofl.engine.Layer>;
	function getFramesAt(frameIndex:Int) : Array<nanofl.engine.Frame>;
	override function removeInstance(namePath:String) : Void;
	override function swapInstance(oldNamePath:String, newNamePath:String) : Void;
	override function getIcon() : String;
	override function save(fileApi:nanofl.engine.FileApi) : Void;
	override function loadProperties(xml:htmlparser.HtmlNodeElement) : Void;
	override function saveToXml(out:nanofl.engine.XmlWriter) : Void;
	function getTotalFrames() : Int;
	function getTimelineState() : nanofl.ide.undo.states.TimelineState;
	function setTimelineState(state:nanofl.ide.undo.states.TimelineState) : Void;
	override function createDisplayObject(initFrameIndex:Int, childFrameIndexes:Array<{ var frameIndex : Int; var element : nanofl.engine.IPathElement; }>) : nanofl.MovieClip;
	override function updateDisplayObject(dispObj:createjs.DisplayObject, childFrameIndexes:Array<{ var frameIndex : Int; var element : nanofl.engine.IPathElement; }>) : Void;
	override function hasInstance(namePath:String) : Bool;
	override function getUsedItems() : Array<nanofl.engine.libraryitems.LibraryItem>;
	override function getUsedFilters() : Array<String>;
	override function getDisplayObjectClassName() : String;
	function transform(m:nanofl.engine.geom.Matrix) : Void;
	override function toString() : String;
	static function parse(namePath:String, movieClipNode:htmlparser.HtmlNodeElement) : nanofl.engine.libraryitems.MovieClipItem;
}