import haxe.io.Path;
import nanofl.engine.libraryitems.BitmapItem;
import nanofl.engine.libraryitems.LibraryItem;
import nanofl.ide.CachedFile;
import nanofl.ide.plugins.ILoaderPlugin;
using Lambda;

class BitmapLoaderPlugin implements ILoaderPlugin
{
	static var extensions = [ "jpg", "jpeg", "png", "gif", "svg" ];
	
	public var name = "BitmapLoader";
	public var priority = 100;
	
	public function new() {}
	
	public function load(files:Map<String, CachedFile>) : Array<LibraryItem>
	{
		var r = new Array<LibraryItem>();
		
		for (file in files)
		{
			if (file.excluded) continue;
			
			var ext = Path.extension(file.path);
			if (extensions.indexOf(ext) >= 0)
			{
				var namePath = Path.withoutExtension(file.path);
				if (!r.exists(function(item) return item.namePath == namePath))
				{
					var item = new BitmapItem(namePath, ext);
					var xmlFile = files.get(namePath + ".bitmap");
					if (xmlFile != null && xmlFile.getXml() != null)
					{
						item.loadProperties(xmlFile.getXml().children[0]);
					}
					r.push(item);
				}
				file.exclude();
			}
		}
		
		return r;
	}
}