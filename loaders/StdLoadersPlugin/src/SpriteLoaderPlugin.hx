import haxe.io.Path;
import nanofl.engine.CustomProperty;
import nanofl.engine.libraryitems.LibraryItem;
import nanofl.engine.libraryitems.SpriteItem;
import nanofl.ide.filesystem.CachedFile;
import nanofl.ide.plugins.ILoaderPlugin;
import nanofl.ide.NanoApi;
using Lambda;

class SpriteLoaderPlugin implements ILoaderPlugin
{
	public var name = "SpriteLoader";
	public var priority = 500;
	public var menuItemName = "Sprite";
	public var menuItemIcon = "";
	public var properties : Array<CustomProperty> = null;
	
	public function new() {}
	
	public function load(api:NanoApi, params:Dynamic, baseDir:String, files:Map<String, CachedFile>) : Array<LibraryItem>
	{
		var r = new Array<LibraryItem>();
		
		for (file in files)
		{
			if (file.excluded) continue;
			
			if (Path.extension(file.path) == "json")
			{
				var namePath = Path.withoutExtension(file.path);
				if (!r.exists(function(item) return item.namePath == namePath))
				{
					var json : { framerate:Int, images:Array<String>, frames:Array<Array<Int>> } = file.json;
					if (json != null && json.frames != null && json.images != null)
					{
						r.push(new SpriteItem(namePath, json.frames.map(function(frame) return
						{
							image: json.images[frame[4]],
							x: frame[0],
							y: frame[1],
							width: frame[2],
							height: frame[3],
							regX: cast frame[5],
							regY: cast frame[6]
						})));
						
						for (image in json.images)
						{
							var p = Path.join([ Path.directory(namePath), image ]);
							if (files.exists(p)) files.get(p).exclude();
						}
						
						file.exclude();
					}
				}
			}
		}
		
		return r;
	}
}