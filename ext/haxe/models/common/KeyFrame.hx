package models.common;

extern class KeyFrame
{
	function new(?label:String, ?duration:Int, ?motionTween:models.common.tweens.MotionTween, ?elements:Array<models.common.elements.Element>) : Void;
	var layer : models.common.Layer;
	var label : String;
	var duration : Int;
	var motionTween : models.common.tweens.MotionTween;
	var elements(default, never) : models.common.ArrayRO<models.common.elements.Element>;
	function addElement(element:models.common.elements.Element, ?index:Int) : Void;
	function removeElementAt(n:Int) : Void;
	function swapElement(i:Int, j:Int) : Void;
	function duplicate(?label:String, ?duration:Int, ?elements:Array<models.common.elements.Element>) : models.common.KeyFrame;
	function getShape(createIfNotExist:Bool) : models.common.elements.ShapeElement;
	function clone() : models.common.KeyFrame;
	function isEmpty() : Bool;
	function getElementsState() : { var elements : Array<models.common.elements.Element>; };
	function setElementsState(state:{ var elements : Array<models.common.elements.Element>; }) : Void;
	function getTweenedElements(frameSubIndex:Int) : Array<models.common.TweenedElement>;
	function getNextKeyFrame() : models.common.KeyFrame;
	function getParentLayerFrame(frameSubIndex:Int) : models.common.Frame;
	function hasGoodMotionTween() : Bool;
	function getParentGuide(frameSubIndex:Int) : models.common.Guide;
	function save(out:models.common.XmlWriter) : Void;
	function getIndex() : Int;
	function getUsedItems() : Array<models.common.libraryitems.LibraryItem>;
	static function parse(node:htmlparser.HtmlNodeElement) : models.common.KeyFrame;
}