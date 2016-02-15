import nanofl.engine.CustomProperty;
import nanofl.engine.DocumentProperties;
import nanofl.engine.Library;
import nanofl.ide.plugins.IExporterPlugin;
import nanofl.ide.NanoApi;

class PngImageExporterPlugin implements IExporterPlugin
{
	public function new() { }
	
	public var name = "PngImageExporter";
	
	public var menuItemName = "PNG Image (*.png)";
	public var menuItemIcon = "custom-icon-picture";
	public var fileFilterDescription = "PNG Image (*.png)";
	public var fileFilterExtensions = [ "png" ];
	public var fileDefaultExtension = "png";
	public var properties : Array<CustomProperty> = null;
	
	public function exportDocument(api:NanoApi, params:Dynamic, srcFilePath:String, destFilePath:String, documentProperties:DocumentProperties, library:Library) : Bool
	{
		ImageExporter.run("image/png", api.fileSystem, destFilePath, documentProperties, library);
		return true;
	}
}