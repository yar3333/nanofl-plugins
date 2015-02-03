package models.common.elements;

extern class GroupElement extends models.common.elements.Element implements models.common.ILayersContainer implements models.common.IPathElement
{
	function new(elements:Array<models.common.elements.Element>) : Void;
	var currentFrame : Int;
	var layers(default, never) : models.common.ArrayRO<models.common.Layer>;
	function addElement(element:models.common.elements.Element) : Void;
	override function removeInstance(namePath:String) : Void;
	override function swapInstance(oldNamePath:String, newNamePath:String) : Void;
	override function save(out:models.common.XmlWriter) : Void;
	override function clone() : models.common.elements.Element;
	override function getUsedItems() : Array<models.common.libraryitems.LibraryItem>;
	override function createDisplayObject(frameIndexes:Array<{ var frameIndex : Int; var element : models.common.IPathElement; }>) : createjs.DisplayObject;
	override function updateDisplayObject(dispObj:createjs.DisplayObject, frameIndexes:Array<{ var frameIndex : Int; var element : models.common.IPathElement; }>) : createjs.Container;
	function getMaskFilter(layer:models.common.Layer, frameIndex:Int) : createjs.Container;
	function isScene() : Bool;
	function getNavigatorName() : String;
	function getNavigatorIcon() : String;
	function getChildren() : Array<models.common.elements.Element>;
	function getTimeline() : models.common.ITimeline;
}