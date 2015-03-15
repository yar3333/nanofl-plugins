import nanofl.engine.DocumentProperties;
import nanofl.engine.FileApi;
import nanofl.engine.Library;
import nanofl.ide.plugins.IExporterPlugin;

class JpegImageSequenceExporterPlugin implements IExporterPlugin
{
	public function new() { }
	
	public var name = "JpegImageSequenceExporter";
	
	public var menuItemName = "Sequence of JPEG Images (*.jpg)";
	public var menuItemIcon = "";
	public var fileFilterDescription = "JPEG Image (*.jpg)";
	public var fileFilterExtensions = [ "jpg", "jpeg" ];
	public var fileDefaultExtension = "jpg";
	
	public function exportDocument(fileApi:FileApi, srcFilePath:String, destFilePath:String, documentProperties:DocumentProperties, library:Library) : Bool
	{
		ImageSequenceExporter.run("image/jpeg", fileApi, destFilePath, documentProperties, library);
		return true;
	}
}