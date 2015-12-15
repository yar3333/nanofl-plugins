import haxe.io.Path;
import nanofl.engine.CustomProperty;
import nanofl.engine.Debug.console;
import nanofl.engine.DocumentProperties;
import nanofl.engine.FileApi;
import nanofl.engine.Library;
import nanofl.engine.Plugins;
import nanofl.ide.plugins.IPublisherPlugin;
using Lambda;
using StringTools;

class ApacheCordovaPublisherPlugin implements IPublisherPlugin
{
	static function main() Plugins.registerPublisher(new ApacheCordovaPublisherPlugin());
	
	public function new() { }
	
	public var name = "ApacheCordovaPublisher";
	
	public var menuItemName = "Apache Cordova";
	public var menuItemIcon = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAACXBIWXMAAAsSAAALEgHS3X78AAACv0lEQVQokSXBzWtcVRwG4Pece+Kdmc6XIZO2SgPB2jrWpn5V3IouBVGEuBEEEeqiddFtV+JfYAQhJepCDAguKrVg1VjFoKiYkFrT1jTp3Gk7na/MzJ2Pm7nn/s7rwudRJJEkiVFKJSLyehzHp0SkJSIQESUi4pybBvAlgEUAGoBTJD2SQvJR59xXnucdV0pJp9PxrLWYLBYdFXSz2aqSfEVrvUbS0wBEKQWl1Nta6+ObN7fiP/5a14VCgaVSid//vKoufXclzmQyh7TnvZeIpEgKSEJEXiApt4M7yamz59yb757lpcsrvPjtD3zupVdZmH2SP63+HktiGQTBa7VaDYZk3pHva0D/uf63S/u+ejCTxteXVzCK9jCdy+CWc/hw6XPzzIljyGazHwyHQ9+IyL5+GD6bJNbZeKyfOPYYJh6YQNjpopjP4bdr19EaC4zE6n6t5kgpt3e7L2oAIxG56qczerded7VwgMyJOdy4voWLF75B6qmnsb98FPe3K6Si7nS621EU/WqUUnsi8q/n6ZOjfp/r95pwhw/j6rVNVG9XEJ98HnebLUylJmhtrKIo2rHWbhiS4/5gsJVO+UgXC/xx6Qv+cmVV+UwQQ2Hlo4/R7fZ4+q15N+r39WA43CZ50xhjUCwWt+uNBh4vH+G5M+8oG+3BTRiQhLYWDlo99PB+tNq7iKLolta6ZxqNBhYWFnbm599APpNKyo8c6k1Nl/b5xqRskiAMw3G93hrkC7l0p9cz+Vx+x1oL3W63sby8HB48eMCl0unU+aVPK/9s3ojCYaR6/ZEK7ty15z/5bGs42ovKR45icXGxFgQBVKVSwezs7NTc3NzLSZKUq9WqnpyczPq+r0kijmM2m81uqVRyuVxuZ2Nj48La2lpDBUGAmZkZ3/O8gogcAJAFkAAg/qcAGAAjrfU951xYrVbH/wGrY6Tm/qMTkAAAAABJRU5ErkJggg==)";
	
	public var properties : Array<CustomProperty> =
	[
		{ type:"string", name:"outPath",	label:"Output folder",	defaultValue:"publish/cordova",		description:"Folder to store cordova files." },
		{ type:"string", name:"domain", 	label:"Project domain",	defaultValue:"com.example.hello",	description:"Project name in domain notation." },
		{ type:"string", name:"title", 		label:"Title",			defaultValue:"",					description:"Application's display title" },
		
		{ type:"delimiter", label:"Platforms" },
		{ type:"bool", name:"platform_amazon_fireos",	label:"Amazon Fire OS",			defaultValue:false },
		{ type:"bool", name:"platform_android", 		label:"Android", 				defaultValue:false },
		{ type:"bool", name:"platform_blackberry10",	label:"Blackberry 10", 			defaultValue:false },
		{ type:"bool", name:"platform_firefoxos",		label:"Firefox OS", 			defaultValue:false },
		{ type:"bool", name:"platform_ios",				label:"iOS",					defaultValue:false },
		{ type:"bool", name:"platform_ubuntu",			label:"Ubuntu", 				defaultValue:false },
		{ type:"bool", name:"platform_windows8",		label:"Windows 8+, Phone 8.1",	defaultValue:false },
		{ type:"bool", name:"platform_wp8", 			label:"Windows Phone 8", 		defaultValue:false },
	];
	
	public function publish(fileApi:FileApi, params:Dynamic, filePath:String, documentProperties:DocumentProperties, library:Library, generatorFiles:Array<String>) : Void
	{
		console.log("ApacheCordovaPublisherPlugin.publish " + generatorFiles);
		
		if (params.outPath == "") error("Output folder must be specified. Check publish settings.");
		
		var baseSrcDir = Path.directory(filePath);
		var outPath = Path.join([ baseSrcDir, params.outPath ]);
		
		var cordovaCLI = new CordovaCLI(fileApi, outPath);
		
		if (!fileApi.exists(outPath) || fileApi.readDirectory(outPath).length == 0)
		{
			fileApi.createDirectory(outPath);
			cordovaCLI.createApplication(params.domain, params.title != "" ? params.title : Path.withoutDirectory(Path.withoutExtension(filePath)));
		}
		
		var platforms = cordovaCLI.getPlatforms();
		console.log("Installed platforms = " + platforms.installed.join(" | "));
		console.log("Available platforms = " + platforms.available.join(" | "));
		
		for (name in Reflect.fields(params))
		{
			if (name.startsWith("platform_"))
			{
				var platform = name.substring("platform_".length).replace("_", "-");
				log("params." + name + " => " + platform);
				
				if (Reflect.field(params, name))
				{
					if (!platforms.installed.exists(function(s) return trimNums(s) == trimNums(platform)))
					{
						if (platforms.available.indexOf(platform) >= 0)
						{
							console.log("Add platform: " + platform);
							cordovaCLI.addPlatform(platform);
						}
						else
						{
							console.log("Can't add platform '" + platform + "' due unsupported.");
						}
					}
				}
				else
				{
					if (platforms.installed.exists(function(s) return trimNums(s) == trimNums(platform)))
					{
						console.log("Remove platform: " + platform);
						cordovaCLI.removePlatform(platform);
					}
				}
			}
		}
		
		log("COPY");
		var destDir = outPath + "/www";
		removeDirectoryContent(fileApi, destDir);
		for (file in generatorFiles)
		{
			fileApi.copy(baseSrcDir + "/" + file, outPath + "/" + file);
		}
		library.publish(fileApi, documentProperties.useTextureAtlases, outPath + "/library");
		
		log("BUILD");
		cordovaCLI.build();
	}
	
	function removeDirectoryContent(fileApi:FileApi, dir:String)
	{
		for (file in fileApi.readDirectory(dir))
		{
			fileApi.remove(dir + "/" + file);
		}
	}
	
	function trimNums(s:String) : String
	{
		while (s.length > 0 && "0123456789".indexOf(s.charAt(s.length - 1)) >= 0) s = s.substring(0, s.length - 1);
		return s;
	}
	
	function error(s:String, ?infos:haxe.PosInfos)
	{
		haxe.Log.trace(s, infos);
		throw s;
	}
	
	static function log(s:Dynamic, ?infos:haxe.PosInfos)
	{
		haxe.Log.trace(s, infos);
	}
}