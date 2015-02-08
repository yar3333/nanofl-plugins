import flashimport.DocumentImporter;
import flashimport.Macro;
import models.common.DocumentProperties;
import models.common.FileApi;
import models.common.Library;
import models.common.Plugins;
import models.common.plugins.IImporterPlugin;

class FlashXflImporterPlugin implements IImporterPlugin
{
	#if ide // compilation with ide
	static var IMPORT_MEDIA_SCRIPT_TEMPLATE = Macro.embedFile("../tools/FlashMediaImporter/bin/FlashMediaImporter.jsfl");
	#else // compilaplugin
	static var IMPORT_MEDIA_SCRIPT_TEMPLATE = Macro.embedFile("../../tools/FlashMediaImporter/bin/FlashMediaImporter.jsfl");
	#end
	
	static function main() Plugins.registerImporter(new FlashXflImporterPlugin());
	
	public function new() { }
	
	public var name = "FlashXflImporter";
	
	public var menuItemName = "Adobe Flash Uncompressed Document (*.xfl)";
	public var fileFilterDescription = "Adobe Flash Uncompressed Document (*.xfl)";
	public var fileFilterPattern = "*.xfl";
	
	public function importDocument(fileApi:FileApi, srcFilePath:String, destFilePath:String, documentProperties:DocumentProperties, library:Library, fonts:Array<String>, callb:Bool->Void)
	{
		DocumentImporter.process(IMPORT_MEDIA_SCRIPT_TEMPLATE, fileApi, srcFilePath, destFilePath, documentProperties, library, fonts, true, null, callb);
	}
}
