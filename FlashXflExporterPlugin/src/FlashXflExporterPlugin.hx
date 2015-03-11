import nanofl.engine.DocumentProperties;
import nanofl.engine.FileApi;
import nanofl.engine.Library;
import nanofl.engine.Plugins;
import nanofl.ide.plugins.IExporterPlugin;
import nanofl.engine.XmlWriter;

class FlashXflExporterPlugin implements IExporterPlugin
{
	static function main() Plugins.registerExporter(new FlashXflExporterPlugin());
	
	public function new() { }
	
	public var name = "FlashXfl";
	
	public var menuItemName = "Adobe Flash Uncompressed Document (*.xfl)";
	public var menuItemIcon = "";
	public var fileFilterDescription = "Adobe Flash Document (*.xfl)";
	public var fileFilterExtensions = [ "xfl" ];
	public var fileDefaultExtension = "xfl";
	
	public function exportDocument(fileApi:FileApi, srcFilePath:String, destFilePath:String, documentProperties:DocumentProperties, library:Library) : Bool
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
		
		return true;
	}
}