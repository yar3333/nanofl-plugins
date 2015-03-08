package nanofl.ide.editorelements;

extern class EditorElement implements nanofl.engine.ISelectable
{
	var frame(default, null) : nanofl.engine.Frame;
	var originalElement(default, null) : nanofl.engine.elements.Element;
	var currentElement(default, null) : nanofl.engine.elements.Element;
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