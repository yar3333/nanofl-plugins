package nanofl.engine;

extern class FontVariant
{
	function new(?style:String, ?weight:Int, ?locals:Array<String>, ?url:String, ?format:String) : Void;
	/**
	 * "normal", "italic"
	 */
	var style : String;
	/**
	 * 100=thin, 300=light, 400=normal, 600=semiBold, 700=bold, 800=extraBold
	 */
	var weight : Int;
	/**
	 * possible font name in system to prevent loading from web if exists locally ("Open Sans Bold", "OpenSans-Bold")
	 */
	var locals : Array<String>;
	/**
	 * url to font file (can be relative to library directory)
	 */
	var url : String;
	/**
	 * font file format ("woff")
	 */
	var format : String;
	function equ(e:nanofl.engine.FontVariant) : Bool;
}