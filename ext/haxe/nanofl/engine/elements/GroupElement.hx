package nanofl.engine.elements;

extern class GroupElement extends nanofl.engine.elements.Element implements nanofl.engine.ILayersContainer implements nanofl.engine.IPathElement
{
	function new(elements:Array<nanofl.engine.elements.Element>) : Void;
	var name : String;
	var currentFrame : Int;
	var layers(default, never) : nanofl.engine.ArrayRO<nanofl.engine.Layer>;
	function addElement(element:nanofl.engine.elements.Element) : Void;
	override function removeInstance(namePath:String) : Void;
	override function swapInstance(oldNamePath:String, newNamePath:String) : Void;
	override function save(out:nanofl.engine.XmlWriter) : Void;
	override function clone() : nanofl.engine.elements.Element;
	override function getUsedItems() : Array<nanofl.engine.libraryitems.LibraryItem>;
	override function getUsedFilters() : Array<String>;
	override function createDisplayObject(frameIndexes:Array<{ var frameIndex : Int; var element : nanofl.engine.IPathElement; }>) : createjs.DisplayObject;
	override function updateDisplayObject(dispObj:createjs.DisplayObject, frameIndexes:Array<{ var frameIndex : Int; var element : nanofl.engine.IPathElement; }>) : createjs.Container;
	function getMaskFilter(layer:nanofl.engine.Layer, frameIndex:Int) : createjs.Container;
	function isScene() : Bool;
	function getNavigatorName() : String;
	function getNavigatorIcon() : String;
	function getChildren() : Array<nanofl.engine.elements.Element>;
	function getTimeline() : nanofl.engine.ITimeline;
}