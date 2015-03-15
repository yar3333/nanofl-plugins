import nanofl.engine.DocumentProperties;
import nanofl.engine.FileApi;
import nanofl.engine.Library;
import nanofl.ide.plugins.IExporterPlugin;

class PngImageExporterPlugin implements IExporterPlugin
{
	public function new() { }
	
	public var name = "PngImageExporter";
	
	public var menuItemName = "PNG Image (*.png)";
	public var menuItemIcon = "";
	public var fileFilterDescription = "PNG Image (*.png)";
	public var fileFilterExtensions = [ "png" ];
	public var fileDefaultExtension = "png";
	
	public function exportDocument(fileApi:FileApi, srcFilePath:String, destFilePath:String, documentProperties:DocumentProperties, library:Library) : Bool
	{
		ImageExporter.run("image/png", fileApi, destFilePath, documentProperties, library);
		return true;
	}
}