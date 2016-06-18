package nanofl.ide.publishing;

extern class PublishSettings
{
	function new(?enabled:Bool, ?useTextureAtlases:Bool, ?isConvertImagesIntoJpeg:Bool, ?jpegQuality:Int, ?isGenerateMp3Sounds:Bool, ?isGenerateOggSounds:Bool, ?isGenerateWavSounds:Bool, ?audioQuality:Int) : Void;
	var enabled : Bool;
	var useTextureAtlases : Bool;
	var isConvertImagesIntoJpeg : Bool;
	var jpegQuality : Int;
	var isGenerateMp3Sounds : Bool;
	var isGenerateOggSounds : Bool;
	var isGenerateWavSounds : Bool;
	var audioQuality : Int;
	function equ(p:nanofl.ide.publishing.PublishSettings) : Bool;
	function clone() : nanofl.ide.publishing.PublishSettings;
	function save(out:htmlparser.XmlBuilder) : Void;
	static function load(xml:htmlparser.XmlNodeElement) : nanofl.ide.publishing.PublishSettings;
}