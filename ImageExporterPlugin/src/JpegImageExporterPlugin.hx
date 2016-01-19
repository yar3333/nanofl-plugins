import nanofl.engine.CustomProperty;
import nanofl.engine.DocumentProperties;
import nanofl.engine.FileApi;
import nanofl.engine.Library;
import nanofl.ide.plugins.IExporterPlugin;
import nanofl.ide.plugins.PluginApi;

class JpegImageExporterPlugin implements IExporterPlugin
{
	public function new() { }
	
	public var name = "JpegImageExporter";
	
	public var menuItemName = "JPEG Image (*.jpg)";
	public var menuItemIcon = "custom-icon-picture";
	public var fileFilterDescription = "JPEG Image (*.jpg)";
	public var fileFilterExtensions = [ "jpg", "jpeg" ];
	public var fileDefaultExtension = "jpg";
	public var properties : Array<CustomProperty> = null;
	
	public function exportDocument(api:PluginApi, params:Dynamic, srcFilePath:String, destFilePath:String, documentProperties:DocumentProperties, library:Library) : Bool
	{
		ImageExporter.run("image/jpeg", api.fileSystem, destFilePath, documentProperties, library);
		return true;
	}
}