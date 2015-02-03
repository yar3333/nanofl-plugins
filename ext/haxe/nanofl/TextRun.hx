package nanofl;

extern class TextRun
{
	function new(characters:String, fillColor:String, family:String, style:String, size:Float, align:String, strokeSize:Float, strokeColor:String, backgroundColor:String) : Void;
	var characters : String;
	var fillColor : String;
	var family : String;
	var style : String;
	var size : Float;
	var align : String;
	var strokeSize : Float;
	var strokeColor : String;
	var backgroundColor : String;
	function getFontString() : String;
	function clone() : nanofl.TextRun;
	function duplicate(?characters:String) : nanofl.TextRun;
	function equ(textRun:nanofl.TextRun) : Bool;
	static function optimize(textRuns:Array<nanofl.TextRun>) : Array<nanofl.TextRun>;
}