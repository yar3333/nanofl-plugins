import haxe.io.Path;
import nanofl.engine.CustomProperty;
import nanofl.engine.Debug.console;
import nanofl.engine.FileSystem;
import nanofl.engine.libraryitems.LibraryItem;
import nanofl.engine.libraryitems.MeshItem;
import nanofl.ide.plugins.LoaderPlugins;
import nanofl.ide.filesystem.CachedFile;
import nanofl.ide.NanoApi;
import nanofl.ide.plugins.ILoaderPlugin;
using StringTools;
using Lambda;

class BlenderLoaderPlugin implements ILoaderPlugin
{
	static function main()
	{
		LoaderPlugins.register(new BlenderLoaderPlugin());
	}
	
	public var name = "BlenderLoader";
	public var priority = 700;
	public var menuItemName = "Blender";
	public var menuItemIcon = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAACXBIWXMAADXTAAA10wEMIUN3AAAC20lEQVQoz23JTWxUVRgG4Pd859x756+97dBOW+jUpEwqUAEppAiTNKRqJ2BMGg1hgSwIEHeGjRsNkjTRBXFhJDEpGoNuFDYNYMRosDTWmIJRws+Ean/uUAhT2qnTdjq3M/fM+Vy589k+gojwf5gFmGsCAEtJEgzDAP/3Kp1OAwBIQAohBAlIX1Nlu1scPLE//vXlqbqjo9nCtagNRUTGGDYAILu7u2HbDjQ5bIQyRkhDUmFV2zPtoVLnqQPt55pbN8lsvnqDiBCNONKybFbGMMAa+xLVYy3xWAoyrEnZFDCVn2i+M5Vfm3lze+OZDrd9z6c3nh6bL5YLUZukeDVzEGH48aFdj/7uaNsQ9znEVsQVbnIbIG0ETpxr66UaLXvqWdGf+3hs9Y1sPvhdZDIZMACX/GQ10OvJcGnv232Jzzd1bm2N9RwJKhteUOsaIi4Kujp+Xi3msksf3BT9siu1mSCIFipOcWdTZeCdV9outsXrmyM7BnmuqV9+dv2BuDQxh+mySy/t7tFq/KNoTBeeowpbpqa1OtmZu/BhenmkMci7FX+V7dat4vtf7+G7W1P44c8choav4nGtSYn6jXienvSphPxny8lU7quXU9Q7PIHhlnAheXAPHSovPDLtLV3014yHNT/A4f4X0UBl6JU8QhFLInu6bnHlTJTfPRAbAhROp0Nn+XyK8+d2VOfvj/LPdzz+5uYD9rxZLlw8ovV74OvH638RnxzvOXvXW7r75ag3AqDBdbBt7FR4ZGdzJbEcRGuys09YERdV7zeuW5uVRdmgM1+UBmWlbe/YH7PFh8tLi1FJ1OJrjvw0ZR7v6oj1diUQtlbuQy7dE44MKFdurL717er7415wTbz+2iH1bGGBJ27dFgBcIbCRGQ0WYUvfZqe/tyOUtBSZ7Hww++PD8pWVdXObBMpiYGAASilMT09jcnJSAnBIIAbAMgwJwAKgAZSEQCAYNSsU8v8FJek74SxGiM4AAAAASUVORK5CYII=)";
	
	public var properties : Array<CustomProperty> =
	[
		{ type:"info", label:"This plugin automatically convert *.blend in your library into *.json (supported by NanoFL)."
						   + " Ensure you have <a href='http://blender.org/'>Blender</a>"
						   + " with <a href='https://github.com/mrdoob/three.js/tree/master/utils/exporters/blender'>ThreeJS Blender Export addon</a> installed." },
		{ type:"string", name:"blenderPath", label:"Path to the blender.exe", description:"Leave blank to autodetect", defaultValue:"" }
	];
	
	public function new() {}
	
	/**
	 * Not really load items, just convert Blender's `*.blend` files into ThreeJS's `*.json`
	 * and let StdLoaders plugin to load *.json.
	 */
	public function load(api:NanoApi, params:Dynamic, baseDir:String, files:Map<String, CachedFile>) : Array<LibraryItem>
	{
		var r = [];
		
		var scriptPath = api.fileSystem.getPluginsDirectory() + "/loaders/BlenderLoaderPlugin/blend2three.py";
		var blenderExePath : String = null;
		
		for (file in files)
		{
			if (file.excluded) continue;
			
			var ext = Path.extension(file.path);
			if (ext != null && ext == "blend")
			{
				var namePath = Path.withoutExtension(file.path);
				if (blenderExePath == null)
				{
					blenderExePath = getBlenderExePath(api.fileSystem, params);
					if (blenderExePath == null)
					{
						console.error("Blender is not found. Ensure Blender installed and check the path to the blender.exe in Preferences.");
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
					var item = MeshItem.load(api, namePath, ext, files);
					if (item != null) r.push(item);
				}
				
				file.exclude();
			}
		}
		
		return r; 
	}
	
	function getBlenderExePath(fileSystem:FileSystem, params:{ blenderPath:String })
	{
		if (params.blenderPath != null && params.blenderPath != "" && fileSystem.exists(params.blenderPath))
		{
			return params.blenderPath;
		}
		
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