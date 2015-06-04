package ides;

import nanofl.engine.DocumentProperties;
import nanofl.engine.FileApi;
import nanofl.engine.Library;
import nanofl.engine.Plugins;

class FlashDevelopGenerator
{
	public function new() {}
	
	public function generate(language:String, fileApi:FileApi, dir:String, name:String) : Void
	{
		var ext = switch (language)
		{
			case "JavaScript": ".fdproj";
			case "Haxe":       ".hxproj";
			case _: null;
		};
		
		trace("FlashDevelopIdePlugin.generateFiles language = " + language + "; dir = " + dir + "; name = " + name + "; ext = " + ext);
		
		var destProjectFile = dir + "/" + name + ext;
		
		if (!fileApi.exists(destProjectFile))
		{
			var sourceDir = fileApi.getPluginsDirectory() + "/FlashDevelopIdePlugin/" + language;
			
			var template = fileApi.getContent(sourceDir + "/project" + ext);
			template = template.split("{name}").join(name);
			fileApi.saveContent(destProjectFile, template);
			
			fileApi.copy(sourceDir + "/files", dir);
		}
	}
}
