import haxe.io.Path;
import nanofl.engine.FileApi;
import nanofl.engine.libraryitems.LibraryItem;
import nanofl.engine.libraryitems.ThreeItem;
import nanofl.ide.CachedFile;
import nanofl.ide.plugins.ILoaderPlugin;
using StringTools;
using Lambda;

class ThreeLoaderPlugin implements ILoaderPlugin
{
	public var name = "ThreeLoader";
	public var priority = 600;
	
	public function new() {}
	
	public function load(fileApi:FileApi, baseDir:String, files:Map<String, CachedFile>) : Array<LibraryItem>
	{
		var r = new Array<LibraryItem>();
		
		for (file in files)
		{
			if (file.excluded) continue;
			
			var ext = Path.extension(file.path);
			if (ext != null && ext.toLowerCase() == "json")
			{
				trace("Ready to load ThreeItem");
				var item = ThreeItem.load(fileApi, file.path, ext, files);
				if (item != null) r.push(item);
			}
		}
		
		return r;
	}
}