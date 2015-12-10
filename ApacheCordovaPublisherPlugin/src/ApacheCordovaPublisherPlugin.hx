import haxe.io.Path;
import nanofl.engine.CustomProperty;
import nanofl.engine.Debug.console;
import nanofl.engine.FileApi;
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
	
	public function publish(fileApi:FileApi, params:Dynamic, srcFilePath:String, files:Array<String>) : Void
	{
		console.log("Plugin.publish " + files);
		
		if (params.outPath == "") error("Output folder must be specified. Check publish settings.");
		
		var outPath = Path.join([ Path.directory(srcFilePath), params.outPath ]);
		
		if (!fileApi.exists(outPath) || fileApi.readDirectory(outPath).length == 0)
		{
			fileApi.createDirectory(outPath);
			runCordova([ "create", ".", params.domain, (params.title != "" ? params.title : Path.withoutDirectory(Path.withoutExtension(srcFilePath))) ], fileApi, outPath);
		}
		
		var re = ~/Installed\s+platforms:([^\r\n]+).+?Available\s+platforms:([^\r\n]+)/s;
		var s = runCordova([ "platforms", "ls" ], fileApi, outPath).output;
		log("s = " + s);
		if (re.match(s))
		{
			var installedPlatforms = re.matched(1).split(",").map(StringTools.trim).filter(function(s) return s != "").map(function(s) return s.split(" ")[0]);
			var availablePlatforms = re.matched(2).split(",").map(StringTools.trim).filter(function(s) return s != "");
			console.log("Installed platforms = " + installedPlatforms.join(" | "));
			console.log("Available platforms = " + availablePlatforms.join(" | "));
			
			for (name in Reflect.fields(params))
			{
				if (name.startsWith("platform_"))
				{
					var platform = name.substring("platform_".length).replace("_", "-");
					log("params." + name + " => " + platform);
					
					if (Reflect.field(params, name))
					{
						if (!installedPlatforms.exists(function(s) return trimNums(s) == trimNums(platform)))
						{
							if (availablePlatforms.indexOf(platform) >= 0)
							{
								console.log("Install platform: " + platform);
								runCordova([ "platform", "add", platform ], fileApi, outPath);
							}
							else
							{
								console.log("Unsupported platform: " + platform);
							}
						}
					}
					else
					{
						if (installedPlatforms.exists(function(s) return trimNums(s) == trimNums(platform)))
						{
							console.log("Uninstall platform: " + platform);
							runCordova([ "platform", "remove", platform ], fileApi, outPath);
						}
					}
				}
			}
		}
		else
		{
			error("Can't detect installed platforms.");
		}
	}
	
	function runCordova(args:Array<String>, fileApi:FileApi, directory:String) : { exitCode:Int, output:String, error:String }
	{
		var r = fileApi.runCaptured("cordova", args, null, directory);
		if (r.exitCode != 0) error("Run cordova error: " + args.join(" ") + "\n\texit code = " + r.exitCode + "\n\toutput = " + r.output + "\n\terror = " + r.error);
		return r;
	}
	
	function error(s:String, ?infos:haxe.PosInfos)
	{
		haxe.Log.trace(s, infos);
		throw s;
	}
	
	function trimNums(s:String) : String
	{
		while (s.length > 0 && "0123456789".indexOf(s.charAt(s.length - 1)) >= 0) s = s.substring(0, s.length - 1);
		return s;
	}
	
	static function log(s:Dynamic, ?infos:haxe.PosInfos)
	{
		//haxe.Log.trace(s, infos);
	}
}