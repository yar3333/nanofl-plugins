package nanofl.ide;

extern class LibraryOptimizationParams
{
	function new(?isConvertImagesIntoJpeg:Bool, ?jpegQuality:Int) : Void;
	var isConvertImagesIntoJpeg : Bool;
	var jpegQuality : Int;
	function equ(p:nanofl.ide.LibraryOptimizationParams) : Bool;
	function clone() : nanofl.ide.LibraryOptimizationParams;
	function save() : String;
	static function load(s:String) : nanofl.ide.LibraryOptimizationParams;
}