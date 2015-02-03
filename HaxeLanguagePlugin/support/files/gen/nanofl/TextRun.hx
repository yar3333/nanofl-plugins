package nanofl;

extern class TextRun
{
	var align : String;
	var backgroundColor : String;
	var characters : String;
	var family : String;
	var fillColor : String;
	var size : Float;
	var style : String;
	function new(characters:String, fillColor:String, family:String, style:String, size:Float, align:String, backgroundColor:String) : Void;
	function clone() : TextRun;
	function duplicate(?characters:String) : TextRun;
	function equ(textRun:TextRun) : Bool;
	static function optimize(textRuns:Array<TextRun>) : Array<TextRun>;
}
