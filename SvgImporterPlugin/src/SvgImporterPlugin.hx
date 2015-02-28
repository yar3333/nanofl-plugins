import models.common.libraryitems.MovieClipItem;
import models.common.DocumentProperties;
import models.common.FileApi;
import models.common.Library;
import models.common.Plugins;
import models.common.plugins.IImporterPlugin;

class SvgImporterPlugin implements IImporterPlugin
{
	static function main() Plugins.registerImporter(new SvgImporterPlugin());
	
	public function new() { }
	
	public var name = "SvgImporter";
	
	public var menuItemName = "Scalable Vector Graphics (*.svg)";
	public var fileFilterDescription = "Scalable Vector Graphics (*.svg)";
	public var fileFilterPattern = "*.svg";
	
	public function importDocument(fileApi:FileApi, srcFilePath:String, destFilePath:String, documentProperties:DocumentProperties, library:Library, fonts:Array<String>, callb:Bool->Void)
	{
		var xml = Xml.parse(fileApi.getContent(srcFilePath));
		library.addItem(load(xml, Library.SCENE_NAME_PATH));
		
		callb(true);
	}
	
	
	public function load(xml:Xml, namePath:String) : MovieClipItem
	{
		var svg = new svg.SVGData(xml, false);
		
		var r = new MovieClipItem(namePath);
		//svg.
		return r;
	}
}
