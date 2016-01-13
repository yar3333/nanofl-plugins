package js.three;

@:native("THREE.DetectorStatic") extern interface DetectorStatic
{
	var canvas : Bool;
	var webgl : Bool;
	var workers : Bool;
	var fileapi : Bool;
	function getWebGLErrorMessage() : js.html.HtmlElement;
	function addGetWebGLMessage(?parameters:{ @:optional var parent : js.html.HtmlElement; @:optional var id : String; }) : Void;
}