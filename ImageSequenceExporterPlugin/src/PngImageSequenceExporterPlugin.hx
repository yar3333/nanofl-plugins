import nanofl.engine.DocumentProperties;
import nanofl.engine.FileApi;
import nanofl.engine.Library;
import nanofl.ide.plugins.IExporterPlugin;

class PngImageSequenceExporterPlugin implements IExporterPlugin
{
	public function new() { }
	
	public var name = "PngImageSequenceExporter";
	
	public var menuItemName = "Sequence of PNG Images (*.png)";
	public var menuItemIcon = "icon-film";
	public var fileFilterDescription = "PNG Images Sequence (*.png)";
	public var fileFilterExtensions = [ "png" ];
	public var fileDefaultExtension = "png";
	
	public function exportDocument(fileApi:FileApi, srcFilePath:String, destFilePath:String, documentProperties:DocumentProperties, library:Library) : Bool
	{
		ImageSequenceExporter.run("image/png", fileApi, destFilePath, documentProperties, library);
		return true;
	}
}