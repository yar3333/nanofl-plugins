import haxe.io.Path;
import nanofl.engine.CustomProperty;
import nanofl.engine.Debug.console;
import nanofl.engine.FileSystem;
import nanofl.engine.libraryitems.LibraryItem;
import nanofl.engine.libraryitems.MeshItem;
import nanofl.engine.Plugins;
import nanofl.ide.CachedFile;
import nanofl.ide.plugins.ILoaderPlugin;
import nanofl.ide.plugins.PluginApi;
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
	public var menuItemName = "Blender";
	public var menuItemIcon = "";
	public var properties : Array<CustomProperty> =
	[
		{
			type: "string",
			name: "blenderPath",
			label: "Path to the Blender",
			defaultValue: ""
		}
	];
	
	public function new() {}
	
	/**
	 * Not really load items, just convert Blender's `*.blend` files into ThreeJS's `*.json`
	 * and let StdLoaders plugin to load *.json.
	 */
	public function load(api:PluginApi, params:Dynamic, baseDir:String, files:Map<String, CachedFile>) : Array<LibraryItem>
	{
		var r = [];
		
		var scriptPath = api.fileSystem.getPluginsDirectory() + "/BlenderLoaderPlugin/blend2three.py";
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
					blenderExePath = getBlenderExePath(api.fileSystem);
					if (blenderExePath == null)
					{
						console.error("Blender3D is not found at standard paths.");
						return r;
					}
				}
				
				var relJsonFilePath = namePath + ".json";
				
				var blendFilePath = baseDir + "/" + file.path;
				var jsonFilePath = baseDir + "/" + relJsonFilePath;
				
				if (!api.fileSystem.exists(jsonFilePath) || api.fileSystem.getLastModified(jsonFilePath).getTime() < api.fileSystem.getLastModified(blendFilePath).getTime())
				{
					api.fileSystem.run(blenderExePath, [ "-b", blendFilePath, "-P", scriptPath, "--", jsonFilePath ], true);
					if (api.fileSystem.exists(jsonFilePath))
					{
						if (!files.exists(relJsonFilePath))
						{
							files.set(relJsonFilePath, new CachedFile(api.fileSystem, baseDir, relJsonFilePath));
						}
					}
				}
				
				if (files.exists(relJsonFilePath))
				{
					var item = MeshItem.load(api, relJsonFilePath, ext, files);
					if (item != null) r.push(item);
				}
				
				file.exclude();
			}
		}
		
		return r; 
	}
	
	function getBlenderExePath(fileSystem:FileSystem)
	{
		for (pfEnvVarName in [ "PROGRAMW6432", "PROGRAMFILES", "PROGRAMFILES(X86)" ])
		{
			var pf = fileSystem.getEnvironmentVariable(pfEnvVarName);
			if (pf != null && pf != "" && fileSystem.exists(pf + "\\Blender\\blender.exe"))
			{
				return pf + "\\Blender\\blender.exe";
			}
		}
		return null;
	}
}