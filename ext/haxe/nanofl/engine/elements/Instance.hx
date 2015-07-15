package nanofl.engine.elements;

extern class Instance extends nanofl.engine.elements.Element implements nanofl.engine.IPathElement
{
	function new(namePath:String, ?name:String, ?colorEffect:nanofl.engine.coloreffects.ColorEffect, ?filters:Array<nanofl.engine.FilterDef>) : Void;
	var namePath : String;
	var name : String;
	var colorEffect : nanofl.engine.coloreffects.ColorEffect;
	var filters : Array<nanofl.engine.FilterDef>;
	var symbol(default, never) : nanofl.engine.libraryitems.InstancableItem;
	override function getType() : String;
	override function save(out:htmlparser.XmlBuilder) : Void;
	override function clone() : nanofl.engine.elements.Instance;
	function isScene() : Bool;
	override function getState() : nanofl.ide.undo.states.ElementState;
	override function setState(state:nanofl.ide.undo.states.ElementState) : Void;
	override function toString() : String;
	var layers(default, never) : nanofl.engine.ArrayRO<nanofl.engine.Layer>;
	override function createDisplayObject(frameIndexes:Array<{ var frameIndex : Int; var element : nanofl.engine.IPathElement; }>) : createjs.DisplayObject;
	override function updateDisplayObject(dispObj:createjs.DisplayObject, frameIndexes:Array<{ var frameIndex : Int; var element : nanofl.engine.IPathElement; }>) : createjs.DisplayObject;
	function getNavigatorName() : String;
	function getNavigatorIcon() : String;
	function getChildren() : Array<nanofl.engine.elements.Element>;
	function getTimeline() : nanofl.engine.ITimeline;
	override function equ(element:nanofl.engine.elements.Element) : Bool;
}