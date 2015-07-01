import haxe.io.Path;
import nanofl.engine.libraryitems.FontItem;
import nanofl.engine.libraryitems.LibraryItem;
import nanofl.engine.MapRO;
import nanofl.ide.CachedFile;
import nanofl.ide.plugins.ILoaderPlugin;
using Lambda;

class FontLoaderPlugin implements ILoaderPlugin
{
	public var name = "FontLoader";
	public var priority = 400;
	
	public function new() {}
	
	public function load(files:MapRO<String, CachedFile>) : Array<LibraryItem>
	{
		var r = new Array<LibraryItem>();
		
		for (file in files)
		{
			if (Path.extension(file.path) == "font")
			{
				var namePath = Path.withoutExtension(file.path);
				if (!r.exists(function(item) return item.namePath == namePath))
				{
					var xml = file.getXml();
					if (xml != null)
					{
						r.push(FontItem.parse(namePath, xml.children[0]));
					}
				}
				file.exclude();
			}
		}
		
		return r;
	}
}