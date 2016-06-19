package nanofl.ide.publishing;

extern class PublishSettings
{
	function new(?useTextureAtlases:Bool, ?isConvertImagesIntoJpeg:Bool, ?jpegQuality:Int, ?isGenerateMp3Sounds:Bool, ?isGenerateOggSounds:Bool, ?isGenerateWavSounds:Bool, ?audioQuality:Int, ?urlOnClick:String, ?useLocalScripts:Bool, ?forceSoftwareRenderer:Bool) : Void;
	var useTextureAtlases : Bool;
	var isConvertImagesIntoJpeg : Bool;
	var jpegQuality : Int;
	var isGenerateMp3Sounds : Bool;
	var isGenerateOggSounds : Bool;
	var isGenerateWavSounds : Bool;
	var audioQuality : Int;
	var urlOnClick : String;
	var useLocalScripts : Bool;
	var forceSoftwareRenderer : Bool;
	function equ(p:nanofl.ide.publishing.PublishSettings) : Bool;
	function clone() : nanofl.ide.publishing.PublishSettings;
	function save(out:htmlparser.XmlBuilder) : Void;
	static function load(xml:htmlparser.HtmlNodeElement) : nanofl.ide.publishing.PublishSettings;
}