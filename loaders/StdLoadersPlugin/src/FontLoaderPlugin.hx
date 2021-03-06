import haxe.io.Path;
import nanofl.engine.CustomProperty;
import nanofl.engine.libraryitems.FontItem;
import nanofl.engine.libraryitems.LibraryItem;
import nanofl.ide.filesystem.CachedFile;
import nanofl.ide.plugins.ILoaderPlugin;
import nanofl.ide.NanoApi;
using Lambda;

class FontLoaderPlugin implements ILoaderPlugin
{
	public var name = "FontLoader";
	public var priority = 400;
	public var menuItemName = "Font";
	public var menuItemIcon = "";
	public var properties : Array<CustomProperty> = null;
	
	public function new() {}
	
	public function load(api:NanoApi, params:Dynamic, baseDir:String, files:Map<String, CachedFile>) : Array<LibraryItem>
	{
		var r = new Array<LibraryItem>();
		
		for (file in files)
		{
			if (file.excluded) continue;
			
			if ([ "xml", "font" ].indexOf(Path.extension(file.path)) >= 0)
			{
				var namePath = Path.withoutExtension(file.path);
				if (!r.exists(function(item) return item.namePath == namePath))
				{
					if (file.xml != null)
					{
						var font = FontItem.parse(namePath, file.xml);
						if (font != null)
						{
							r.push(font);
							file.exclude();
						}
					}
				}
			}
		}
		
		return r;
	}
}