import haxe.io.Path;
import nanofl.engine.libraryitems.LibraryItem;
import nanofl.engine.libraryitems.SoundItem;
import nanofl.engine.MapRO;
import nanofl.ide.CachedFile;
import nanofl.ide.plugins.ILoaderPlugin;
using Lambda;

class SoundLoaderPlugin implements ILoaderPlugin
{
	static var extensions = [ "ogg", "mp3", "wav" ];
	
	public var name = "SoundLoader";
	public var priority = 300;
	
	public function new() {}
	
	public function load(files:MapRO<String, CachedFile>) : Array<LibraryItem>
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
					var item = new SoundItem(namePath, ext);
					var xmlFile = files.get(namePath + ".xml");
					if (xmlFile != null && xmlFile.xml != null && xmlFile.xml.name == "sound")
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