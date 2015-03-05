package models.client.editorelements;

extern class EditorElement implements models.common.ISelectable
{
	var frame(default, null) : models.common.Frame;
	var originalElement(default, null) : models.common.elements.Element;
	var currentElement(default, null) : models.common.elements.Element;
	var metaDispObj(default, null) : createjs.Container;
	var selected : Bool;
	var width(get, set) : Float;
	var height(get, set) : Float;
	function updateTransformations() : Void;
	function update() : Void;
	function rebind() : Void;
	function getBounds() : createjs.Rectangle;
	function getTransformedBounds() : createjs.Rectangle;
	function hitTest(x:Float, y:Float) : Bool;
}