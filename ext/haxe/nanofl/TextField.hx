package nanofl;

typedef TextWithParams =
{
	var backgroundColor : String;
	var bounds : createjs.Rectangle;
	var charIndex : Int;
	var text : createjs.Text;
	var textSecond : createjs.Text;
};

typedef TextLine =
{
	var align : String;
	var maxFontSize : Float;
	var maxY : Float;
	var minY : Float;
	var texts : Array<nanofl.TextField.TextWithParams>;
	var width : Float;
};

extern class TextField extends createjs.Container
{
	function new(?width:Float, ?height:Float, ?selectable:Bool, ?border:Bool, ?dashedBorder:Bool, ?textRuns:Array<nanofl.TextRun>, ?newTextFormat:nanofl.TextRun) : Void;
	var minWidth(default, null) : Float;
	var minHeight(default, null) : Float;
	var width(default, set) : Float;
	var height(default, set) : Float;
	var selectable : Bool;
	var border(default, set) : Bool;
	var dashedBorder(default, set) : Bool;
	var textRuns : Array<nanofl.TextRun>;
	var editing(default, set) : Bool;
	var selectionStart(null, set) : Int;
	var selectionEnd(null, set) : Int;
	var newTextFormat(default, set) : nanofl.TextRun;
	var resize(default, null) : stdlib.Event<{ var width : Float; var height : Float; }>;
	var change(default, null) : stdlib.Event<{ }>;
	var text(get, set) : String;
	override function draw(ctx:js.html.CanvasRenderingContext2D, ?ignoreCache:Bool) : Bool;
	function getSelectionFormat() : nanofl.TextRun;
	function setSelectionFormat(format:nanofl.TextRun) : Void;
	function dispose() : Void;
	override function clone(?recursive:Bool) : createjs.DisplayObject;
}