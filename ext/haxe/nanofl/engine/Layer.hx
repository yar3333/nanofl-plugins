package nanofl.engine;

extern class Layer
{
	function new(name:String, ?type:String, ?visible:Bool, ?locked:Bool, ?parentIndex:Int) : Void;
	var name : String;
	var type : String;
	var visible : Bool;
	var locked : Bool;
	var parentIndex : Int;
	var parentLayer(default, never) : nanofl.engine.Layer;
	var keyFrames(default, never) : nanofl.engine.ArrayRO<nanofl.engine.KeyFrame>;
	function getTotalFrames() : Int;
	function getFrame(frameIndex:Int) : nanofl.engine.Frame;
	function addKeyFrame(keyFrame:nanofl.engine.KeyFrame) : Void;
	function insertFrame(frameIndex:Int) : Void;
	function convertToKeyFrame(frameIndex:Int) : Bool;
	function removeFrame(frameIndex:Int) : Bool;
	function removeInstance(namePath:String) : Void;
	function swapInstance(oldNamePath:String, newNamePath:String) : Void;
	function hasInstance(namePath:String) : Bool;
	function getHumanType() : String;
	function getIcon() : String;
	function getNestLevel(layers:nanofl.engine.ArrayRO<nanofl.engine.Layer>) : Int;
	function getParentGuide(frameIndex:Int) : nanofl.engine.Guide;
	function getChildLayers() : Array<nanofl.engine.Layer>;
	function getTweenedElements(frameIndex:Int) : Array<nanofl.engine.TweenedElement>;
	function save(out:htmlparser.XmlBuilder) : Void;
	function clone() : nanofl.engine.Layer;
	function duplicate(keyFrames:nanofl.engine.ArrayRO<nanofl.engine.KeyFrame>, parentIndex:Int) : nanofl.engine.Layer;
	function getIndex() : Int;
	function getUsedItems() : Array<nanofl.engine.libraryitems.LibraryItem>;
	function getUsedFilters() : Array<String>;
	static function parse(node:htmlparser.HtmlNodeElement) : nanofl.engine.Layer;
}