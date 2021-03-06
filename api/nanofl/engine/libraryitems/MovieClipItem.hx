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
	override function clone() : nanofl.engine.libraryitems.MovieClipItem;
	function addLayer(layer:nanofl.engine.Layer) : Void;
	/**
	 * Add block of layers into timeline.
	 * Assume that layers' parentIndex referenced inside block.
	 */
	function addLayersBlock(layersToAdd:Array<nanofl.engine.Layer>, ?index:Int) : Void;
	function removeLayer(index:Int) : Void;
	function removeLayerWithChildren(index:Int) : Array<nanofl.engine.Layer>;
	function getFramesAt(frameIndex:Int) : Array<nanofl.engine.Frame>;
	override function getIcon() : String;
	override function save(fileSystem:nanofl.engine.FileSystem) : Void;
	override function loadProperties(xml:htmlparser.HtmlNodeElement) : Void;
	override function saveToXml(out:htmlparser.XmlBuilder) : Void;
	function getTotalFrames() : Int;
	function getTimelineState() : nanofl.ide.undo.states.TimelineState;
	function setTimelineState(state:nanofl.ide.undo.states.TimelineState) : Void;
	override function createDisplayObject(initFrameIndex:Int, childFrameIndexes:Array<{ var frameIndex : Int; var element : nanofl.engine.IPathElement; }>) : nanofl.MovieClip;
	override function updateDisplayObject(dispObj:createjs.DisplayObject, childFrameIndexes:Array<{ var frameIndex : Int; var element : nanofl.engine.IPathElement; }>) : Void;
	override function getNearestPoint(pos:nanofl.engine.geom.Point) : nanofl.engine.geom.Point;
	override function getDisplayObjectClassName() : String;
	function transform(m:nanofl.engine.geom.Matrix) : Void;
	override function equ(item:nanofl.engine.libraryitems.LibraryItem) : Bool;
	override function getUsedSymbolNamePaths() : Array<String>;
	override function toString() : String;
	static function parse(namePath:String, itemNode:htmlparser.HtmlNodeElement) : nanofl.engine.libraryitems.MovieClipItem;
	static function createWithFrame(namePath:String, ?elements:Array<nanofl.engine.elements.Element>, ?layerName:String) : nanofl.engine.libraryitems.MovieClipItem;
}