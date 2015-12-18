package nanofl.ide;

extern class PublishOptimizations
{
	function new(useTextureAtlases:Bool, ?isConvertImagesIntoJpeg:Bool, ?jpegQuality:Int, ?isGenerateMp3Sounds:Bool, ?isGenerateOggSounds:Bool, ?isGenerateWavSounds:Bool, ?audioQuality:Int) : Void;
	var useTextureAtlases : Bool;
	var isConvertImagesIntoJpeg : Bool;
	var jpegQuality : Int;
	var isGenerateMp3Sounds : Bool;
	var isGenerateOggSounds : Bool;
	var isGenerateWavSounds : Bool;
	var audioQuality : Int;
	function equ(p:nanofl.ide.PublishOptimizations) : Bool;
	function clone() : nanofl.ide.PublishOptimizations;
	function save() : String;
	static function load(s:String) : nanofl.ide.PublishOptimizations;
}