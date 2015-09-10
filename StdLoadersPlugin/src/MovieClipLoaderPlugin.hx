import haxe.io.Path;
import nanofl.engine.libraryitems.LibraryItem;
import nanofl.engine.libraryitems.MovieClipItem;
import nanofl.engine.MapRO;
import nanofl.ide.CachedFile;
import nanofl.ide.plugins.ILoaderPlugin;
using Lambda;

class MovieClipLoaderPlugin implements ILoaderPlugin
{
	public var name = "MovieClipLoader";
	public var priority = 200;
	
	public function new() {}
	
	public function load(files:MapRO<String, CachedFile>) : Array<LibraryItem>
	{
		var r = new Array<LibraryItem>();
		
		for (file in files)
		{
			if (file.excluded) continue;
			
			if (Path.extension(file.path) == "xml")
			{
				var namePath = Path.withoutExtension(file.path);
				if (!r.exists(function(item) return item.namePath == namePath))
				{
					if (file.xml != null)
					{
						var mc = MovieClipItem.parse(namePath, file.xml);
						if (mc != null)
						{
							r.push(mc);
							file.exclude();
						}
					}
				}
			}
		}
		
		return r;
	}
}