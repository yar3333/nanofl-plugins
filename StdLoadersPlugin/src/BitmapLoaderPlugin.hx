import haxe.io.Path;
import nanofl.engine.CustomProperty;
import nanofl.engine.FileSystem;
import nanofl.engine.libraryitems.BitmapItem;
import nanofl.engine.libraryitems.LibraryItem;
import nanofl.ide.CachedFile;
import nanofl.ide.plugins.ILoaderPlugin;
import nanofl.ide.plugins.PluginApi;
using StringTools;
using Lambda;

class BitmapLoaderPlugin implements ILoaderPlugin
{
	static var extensions = [ "jpg", "jpeg", "png", "gif", "svg" ];
	
	public var name = "BitmapLoader";
	public var priority = 100;
	
	public var menuItemName = "Bitmap";
	public var menuItemIcon = "";
	public var properties : Array<CustomProperty> = null;
	
	public function new() {}
	
	public function load(api:PluginApi, params:Dynamic, baseDir:String, files:Map<String, CachedFile>) : Array<LibraryItem>
	{
		var r = new Array<LibraryItem>();
		
		for (file in files)
		{
			if (file.excluded) continue;
			
			var ext = Path.extension(file.path);
			if (ext != null && extensions.indexOf(ext.toLowerCase()) >= 0)
			{
				var namePath = Path.withoutExtension(file.path);
				if (!r.exists(function(item) return item.namePath == namePath))
				{
					var item = new BitmapItem(namePath, ext);
					var xmlFile = files.get(namePath + ".xml");                     // v2.0.0+
					if (xmlFile == null) xmlFile = files.get(namePath + ".bitmap"); // v1.0.0
					if (xmlFile != null && xmlFile.xml != null && xmlFile.xml.name == "bitmap")
					{
						item.loadProperties(xmlFile.xml);
						xmlFile.exclude();
					}
					r.push(item);
				}
				file.exclude();
			}
		}
		
		return r;
	}
}