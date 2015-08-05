package nanofl.engine;

extern class KeyFrame implements nanofl.engine.IElementsContainer
{
	function new(?label:String, ?duration:Int, ?motionTween:nanofl.engine.MotionTween, ?elements:Array<nanofl.engine.elements.Element>) : Void;
	var layer : nanofl.engine.Layer;
	var label : String;
	var duration : Int;
	var motionTween : nanofl.engine.MotionTween;
	var elements(default, never) : nanofl.engine.ArrayRO<nanofl.engine.elements.Element>;
	function addElement(element:nanofl.engine.elements.Element, ?index:Int) : Void;
	function removeElementAt(n:Int) : Void;
	function removeElement(element:nanofl.engine.elements.Element) : Void;
	function swapElement(i:Int, j:Int) : Void;
	function duplicate(?label:String, ?duration:Int, ?elements:Array<nanofl.engine.elements.Element>) : nanofl.engine.KeyFrame;
	function getShape(createIfNotExist:Bool) : nanofl.engine.elements.ShapeElement;
	function clone() : nanofl.engine.KeyFrame;
	function isEmpty() : Bool;
	function getElementsState() : { var elements : Array<nanofl.engine.elements.Element>; };
	function setElementsState(state:{ var elements : Array<nanofl.engine.elements.Element>; }) : Void;
	function getTweenedElements(frameSubIndex:Int) : Array<nanofl.engine.TweenedElement>;
	function getNextKeyFrame() : nanofl.engine.KeyFrame;
	function getParentLayerFrame(frameSubIndex:Int) : nanofl.engine.Frame;
	function hasGoodMotionTween() : Bool;
	function getParentGuide(frameSubIndex:Int) : nanofl.engine.Guide;
	function save(out:htmlparser.XmlBuilder) : Void;
	function getIndex() : Int;
	function equ(keyFrame:nanofl.engine.KeyFrame) : Bool;
	function toString() : String;
	static function parse(node:htmlparser.HtmlNodeElement) : nanofl.engine.KeyFrame;
}