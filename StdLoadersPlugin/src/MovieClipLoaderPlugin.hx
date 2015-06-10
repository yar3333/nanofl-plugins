import haxe.io.Path;
import nanofl.engine.libraryitems.LibraryItem;
import nanofl.engine.libraryitems.MovieClipItem;
import nanofl.ide.CachedFile;
import nanofl.ide.plugins.ILoaderPlugin;
using Lambda;

class MovieClipLoaderPlugin implements ILoaderPlugin
{
	public var name = "MovieClipLoader";
	public var priority = 200;
	
	public function new() {}
	
	public function load(files:Map<String, CachedFile>) : Array<LibraryItem>
	{
		var r = new Array<LibraryItem>();
		
		for (file in files)
		{
			if (file.excluded) continue;
			
			if (Path.extension(file.path) == "movieclip")
			{
				var namePath = Path.withoutExtension(file.path);
				if (!r.exists(function(item) return item.namePath == namePath))
				{
					var xml = file.getXml();
					if (xml != null)
					{
						r.push(MovieClipItem.parse(namePath, xml.children[0]));
					}
				}
				file.exclude();
			}
		}
		
		return r;
	}
}