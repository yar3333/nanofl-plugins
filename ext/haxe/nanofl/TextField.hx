package nanofl;

extern class TextField extends createjs.Container
{
	function new(?width:Float, ?height:Float, ?selectable:Bool, ?border:Bool, ?dashedBorder:Bool, ?textRuns:Array<nanofl.TextRun>, ?newTextFormat:nanofl.TextRun) : Void;
	var minWidth(default, never) : Float;
	var minHeight(default, never) : Float;
	var width : Float;
	var height : Float;
	var selectable : Bool;
	var border : Bool;
	var dashedBorder : Bool;
	var textRuns : Array<nanofl.TextRun>;
	var editing : Bool;
	var selectionStart : Int;
	var selectionEnd : Int;
	var newTextFormat : nanofl.TextRun;
	var resize(default, null) : stdlib.Event<{ var width : Float; var height : Float; }>;
	var change(default, null) : stdlib.Event<{ }>;
	var text : String;
	override function draw(ctx:js.html.CanvasRenderingContext2D, ?ignoreCache:Bool) : Bool;
	function getSelectionFormat() : nanofl.TextRun;
	function setSelectionFormat(format:nanofl.TextRun) : Void;
	function dispose() : Void;
	override function clone(?recursive:Bool) : createjs.DisplayObject;
	static var PADDING : Float;
	static function measureFontHeight(family:String, style:String, size:Float) : Float;
	static function measureFontBaselineCoef(family:String, style:String) : Float;
}