package nanofl.ide;

extern class LibraryOptimizationParams
{
	function new(?isConvertImagesIntoJpeg:Bool, ?jpegQuality:Int, ?isGenerateWavSounds:Bool, ?isGenerateMp3Sounds:Bool, ?isGenerateOggSounds:Bool, ?audioQuality:Int) : Void;
	var isConvertImagesIntoJpeg : Bool;
	var jpegQuality : Int;
	var isGenerateWavSounds : Bool;
	var isGenerateMp3Sounds : Bool;
	var isGenerateOggSounds : Bool;
	var audioQuality : Int;
	function equ(p:nanofl.ide.LibraryOptimizationParams) : Bool;
	function clone() : nanofl.ide.LibraryOptimizationParams;
	function save() : String;
	static function load(s:String) : nanofl.ide.LibraryOptimizationParams;
}