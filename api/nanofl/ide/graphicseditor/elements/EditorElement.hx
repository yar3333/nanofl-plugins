package nanofl.ide.graphicseditor.elements;

extern class EditorElement implements nanofl.engine.ISelectable
{
	var frame(default, null) : nanofl.engine.Frame;
	var originalElement(default, null) : nanofl.engine.elements.Element;
	var currentElement(default, null) : nanofl.engine.elements.Element;
	var metaDispObj(default, null) : createjs.Container;
	var selected : Bool;
	var width : Float;
	var height : Float;
	function updateTransformations() : Void;
	function update() : Void;
	function rebind() : Void;
	function getBounds() : createjs.Rectangle;
	function getTransformedBounds() : createjs.Rectangle;
	function hitTest(pos:nanofl.engine.geom.Point) : Bool;
	function onClick(e:createjs.MouseEvent) : Void;
	function onMouseDown(e:createjs.MouseEvent) : Void;
	function onMouseUp(e:createjs.MouseEvent) : Void;
	function onDoubleClick(e:createjs.MouseEvent) : Void;
}