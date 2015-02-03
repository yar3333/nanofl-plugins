package models.common.elements;

extern class Instance extends models.common.elements.Element implements models.common.IPathElement
{
	function new(namePath:String, ?name:String, ?colorEffect:models.common.coloreffects.ColorEffect, ?filters:Array<models.common.FilterDef>) : Void;
	var namePath : String;
	var name : String;
	var colorEffect : models.common.coloreffects.ColorEffect;
	var filters : Array<models.common.FilterDef>;
	var symbol(default, never) : models.common.libraryitems.InstancableItem;
	override function getType() : String;
	override function save(out:models.common.XmlWriter) : Void;
	override function clone() : models.common.elements.Element;
	override function hasInstance(namePath:String) : Bool;
	override function swapInstance(oldNamePath:String, newNamePath:String) : Void;
	function isScene() : Bool;
	override function getState() : models.client.undo.states.ElementState;
	override function setState(state:models.client.undo.states.ElementState) : Void;
	override function toString() : String;
	var layers(default, never) : models.common.ArrayRO<models.common.Layer>;
	override function getUsedItems() : Array<models.common.libraryitems.LibraryItem>;
	override function createDisplayObject(frameIndexes:Array<{ var frameIndex : Int; var element : models.common.IPathElement; }>) : createjs.DisplayObject;
	override function updateDisplayObject(dispObj:createjs.DisplayObject, frameIndexes:Array<{ var frameIndex : Int; var element : models.common.IPathElement; }>) : createjs.DisplayObject;
	function getNavigatorName() : String;
	function getNavigatorIcon() : String;
	function getChildren() : Array<models.common.elements.Element>;
	function getTimeline() : models.common.ITimeline;
}