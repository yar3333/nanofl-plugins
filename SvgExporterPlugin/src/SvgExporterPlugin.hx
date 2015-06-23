import nanofl.engine.DocumentProperties;
import nanofl.engine.FileApi;
import nanofl.engine.Library;
import nanofl.engine.Plugins;
import nanofl.engine.XmlWriter;
import nanofl.ide.plugins.IExporterPlugin;
import svgexporter.SvgExporter;
using Slambda;

class SvgExporterPlugin implements IExporterPlugin
{
	static function main() Plugins.registerExporter(new SvgExporterPlugin());
	
	public function new() { }
	
	public var name = "SvgExporter";
	
	public var menuItemName = "Scalable Vector Graphics (*.svg)";
	public var menuItemIcon = "";
	public var fileFilterDescription = "Scalable Vector Graphics (*.svg)";
	public var fileFilterExtensions = [ "svg" ];
	public var fileDefaultExtension = "svg";
	
	
	public function exportDocument(fileApi:FileApi, srcFilePath:String, destFilePath:String, documentProperties:DocumentProperties, library:Library) : Bool
	{
		trace("Plugin.exportDocument " + srcFilePath + " => " + destFilePath);
		
		var xml = new XmlWriter();
		xml.begin("svg")
			.attr("xmlns", "http://www.w3.org/2000/svg")
			.attr("width", documentProperties.width)
			.attr("height", documentProperties.height)
			.attr("xmlns:xlink", "http://www.w3.org/1999/xlink");
			
			new SvgExporter(library).export(xml);
			
		xml.end();
		
		fileApi.saveContent(destFilePath, xml.toString());
		
		return true;
	}
}