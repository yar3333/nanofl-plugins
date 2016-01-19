import nanofl.engine.CustomProperty;
import nanofl.engine.DocumentProperties;
import nanofl.engine.Library;
import nanofl.ide.plugins.IExporterPlugin;
import nanofl.ide.NanoApi;

class JpegImageSequenceExporterPlugin implements IExporterPlugin
{
	public function new() { }
	
	public var name = "JpegImageSequenceExporter";
	
	public var menuItemName = "Sequence of JPEG Images (*.jpg)";
	public var menuItemIcon = "custom-icon-film";
	public var fileFilterDescription = "JPEG Images Sequence (*.jpg)";
	public var fileFilterExtensions = [ "jpg", "jpeg" ];
	public var fileDefaultExtension = "jpg";
	public var properties : Array<CustomProperty> = null;
	
	public function exportDocument(api:NanoApi, params:Dynamic, srcFilePath:String, destFilePath:String, documentProperties:DocumentProperties, library:Library) : Bool
	{
		ImageSequenceExporter.run("image/jpeg", api.fileSystem, destFilePath, documentProperties, library);
		return true;
	}
}