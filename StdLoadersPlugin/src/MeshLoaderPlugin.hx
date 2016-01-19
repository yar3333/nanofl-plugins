import nanofl.engine.CustomProperty;
import haxe.io.Path;
import nanofl.engine.FileSystem;
import nanofl.engine.libraryitems.LibraryItem;
import nanofl.engine.libraryitems.MeshItem;
import nanofl.ide.CachedFile;
import nanofl.ide.plugins.ILoaderPlugin;
import nanofl.ide.NanoApi;
using StringTools;
using Lambda;

class MeshLoaderPlugin implements ILoaderPlugin
{
	public var name = "MeshLoader";
	public var priority = 600;
	public var menuItemName = "Mesh";
	public var menuItemIcon = "";
	public var properties : Array<CustomProperty> = null;
	
	public function new() {}
	
	public function load(api:NanoApi, params:Dynamic, baseDir:String, files:Map<String, CachedFile>) : Array<LibraryItem>
	{
		var r = new Array<LibraryItem>();
		
		for (file in files)
		{
			if (file.excluded) continue;
			
			var ext = Path.extension(file.path);
			if (ext != null && ext.toLowerCase() == "json")
			{
				trace("Ready to load MeshItem");
				var item = MeshItem.load(api, file.path, ext, files);
				if (item != null) r.push(item);
			}
		}
		
		return r;
	}
}