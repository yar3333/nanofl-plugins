import models.common.DocumentProperties;
import models.common.FileApi;
import models.common.Library;
import models.common.Plugins;
import models.common.plugins.IExporterPlugin;
import models.common.XmlWriter;

class FlashXflExporterPlugin implements IExporterPlugin
{
	static function main() Plugins.registerExporter(new FlashXflExporterPlugin());
	
	public function new() { }
	
	public var name = "FlashXfl";
	
	public var menuItemName = "Adobe Flash Uncompressed Document (*.xfl)";
	public var menuItemIcon = "";
	public var fileFilterDescription = "Adobe Flash Document (*.xfl)";
	public var fileFilterPattern = "*.xfl";
	public var fileDefaultExtension = "xfl";
	
	public function exportDocument(fileApi:FileApi, srcFilePath:String, destFilePath:String, documentProperties:DocumentProperties, library:Library) : Void
	{
		trace("Plugin.exportDocument " + srcFilePath + " => " + destFilePath);
		var scene = library.getSceneItem();
		trace("scene.layers.length = " + scene.layers.length);
		
		var xml = new XmlWriter();
		xml.begin("root").attr("a", "123");
			xml.begin("inner");
			xml.content("text");
			xml.end();
		xml.end();
		
		fileApi.saveContent(destFilePath, xml.toString());
	}
}