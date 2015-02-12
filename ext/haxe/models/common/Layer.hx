package models.common;

extern class Layer
{
	function new(name:String, ?type:String, ?visible:Bool, ?locked:Bool, ?parentIndex:Int) : Void;
	var name : String;
	var type : String;
	var visible : Bool;
	var locked : Bool;
	var parentIndex : Int;
	var parentLayer(default, never) : models.common.Layer;
	var keyFrames(default, never) : models.common.ArrayRO<models.common.KeyFrame>;
	function getTotalFrames() : Int;
	function getFrame(frameIndex:Int) : models.common.Frame;
	function addKeyFrame(keyFrame:models.common.KeyFrame) : Void;
	function insertFrame(frameIndex:Int) : Void;
	function convertToKeyFrame(frameIndex:Int) : Bool;
	function removeFrame(frameIndex:Int) : Bool;
	function removeInstance(namePath:String) : Void;
	function swapInstance(oldNamePath:String, newNamePath:String) : Void;
	function hasInstance(namePath:String) : Bool;
	function getHumanType() : String;
	function getIcon() : String;
	function getNestLevel(layers:models.common.ArrayRO<models.common.Layer>) : Int;
	function getParentGuide(frameIndex:Int) : models.common.Guide;
	function getChildLayers() : Array<models.common.Layer>;
	function getTweenedElements(frameIndex:Int) : Array<models.common.TweenedElement>;
	function save(out:models.common.XmlWriter) : Void;
	function clone() : models.common.Layer;
	function duplicate(keyFrames:models.common.ArrayRO<models.common.KeyFrame>, parentIndex:Int) : models.common.Layer;
	function getIndex() : Int;
	function getUsedItems() : Array<models.common.libraryitems.LibraryItem>;
	function getUsedFilters() : Array<String>;
	static function parse(node:htmlparser.HtmlNodeElement) : models.common.Layer;
}