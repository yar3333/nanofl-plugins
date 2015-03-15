import nanofl.engine.DocumentProperties;
import nanofl.engine.FileApi;
import nanofl.engine.Library;
import nanofl.ide.plugins.IExporterPlugin;

class JpegImageExporterPlugin implements IExporterPlugin
{
	public function new() { }
	
	public var name = "JpegImageExporter";
	
	public var menuItemName = "JPEG Image (*.jpg)";
	public var menuItemIcon = "";
	public var fileFilterDescription = "JPEG Image (*.jpg)";
	public var fileFilterExtensions = [ "jpg", "jpeg" ];
	public var fileDefaultExtension = "jpg";
	
	public function exportDocument(fileApi:FileApi, srcFilePath:String, destFilePath:String, documentProperties:DocumentProperties, library:Library) : Bool
	{
		ImageExporter.run("image/jpeg", fileApi, destFilePath, documentProperties, library);
		return true;
	}
}