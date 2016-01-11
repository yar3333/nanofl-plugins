import haxe.io.Path;
import nanofl.engine.Debug.console;
import nanofl.engine.FileApi;
import nanofl.engine.libraryitems.MeshItem;
import nanofl.engine.libraryitems.LibraryItem;
import nanofl.engine.Plugins;
import nanofl.ide.CachedFile;
import nanofl.ide.plugins.ILoaderPlugin;
using StringTools;
using Lambda;

class BlenderLoaderPlugin implements ILoaderPlugin
{
	static function main()
	{
		Plugins.registerLoader(new BlenderLoaderPlugin());
	}
	
	public var name = "BlenderLoader";
	public var priority = 700;
	
	public function new() {}
	
	/**
	 * Not really load items, just convert Blender's `*.blend` files into ThreeJS's `*.json`
	 * and let StdLoaders plugin to load *.json.
	 */
	public function load(fileApi:FileApi, baseDir:String, files:Map<String, CachedFile>) : Array<LibraryItem>
	{
		var r = [];
		
		var scriptPath = fileApi.getPluginsDirectory() + "/BlenderLoaderPlugin/blend2threejs.py";
		var blenderExePath : String = null;
		
		for (file in files)
		{
			if (file.excluded) continue;
			
			var ext = Path.extension(file.path);
			if (ext != null && ext.toLowerCase() == "blend")
			{
				var namePath = Path.withoutExtension(file.path);
				if (blenderExePath == null)
				{
					blenderExePath = getBlenderExePath(fileApi);
					if (blenderExePath == null)
					{
						console.error("Blender3D is not found at standard paths.");
						return r;
					}
				}
				
				var relJsonFilePath = namePath + ".json";
				
				var blendFilePath = baseDir + "/" + file.path;
				var jsonFilePath = baseDir + "/" + relJsonFilePath;
				
				if (!fileApi.exists(jsonFilePath) || fileApi.getLastModified(jsonFilePath).getTime() < fileApi.getLastModified(blendFilePath).getTime())
				{
					fileApi.run(blenderExePath, [ "-b", blendFilePath, "-P", scriptPath, "--", jsonFilePath ], true);
					if (fileApi.exists(jsonFilePath))
					{
						if (!files.exists(relJsonFilePath))
						{
							files.set(relJsonFilePath, new CachedFile(fileApi, baseDir, relJsonFilePath));
						}
					}
				}
				
				if (files.exists(relJsonFilePath))
				{
					var item = MeshItem.load(fileApi, relJsonFilePath, ext, files);
					if (item != null) r.push(item);
				}
				
				file.exclude();
			}
		}
		
		return r; 
	}
	
	function getBlenderExePath(fileApi:FileApi)
	{
		for (pfEnvVarName in [ "PROGRAMW6432", "PROGRAMFILES", "PROGRAMFILES(X86)" ])
		{
			var pf = fileApi.getEnvironmentVariable(pfEnvVarName);
			if (pf != null && pf != "" && fileApi.exists(pf + "\\Blender\\blender.exe"))
			{
				return pf + "\\Blender\\blender.exe";
			}
		}
		return null;
	}
}