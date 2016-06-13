import haxe.io.Path;
import nanofl.engine.CustomProperty;
import nanofl.engine.libraryitems.LibraryItem;
import nanofl.engine.libraryitems.MeshItem;
import nanofl.ide.filesystem.CachedFile;
import nanofl.ide.NanoApi;
import nanofl.ide.plugins.ILoaderPlugin;
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
		
		var extensions = [ "xml" ].concat(MeshItem.extensions);
		
		for (file in files)
		{
			if (file.excluded) continue;
			
			var ext = Path.extension(file.path);
			if (extensions.indexOf(ext) >= 0)
			{
				var item = MeshItem.load(api, Path.withoutExtension(file.path), ext, files);
				if (item != null) r.push(item);
			}
		}
		
		return r;
	}
}