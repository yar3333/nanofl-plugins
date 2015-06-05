package ides;

class FlashDevelopGenerator extends BaseIdeGenerator
{
	override public function generate(language:String, dir:String, name:String) : Void
	{
		trace("FlashDevelopGenerator language = " + language + "; dir = " + dir + "; name = " + name);
		
		var ext = switch (language)
		{
			case "JavaScript": ".fdproj";
			case "Haxe":       ".hxproj";
			case _: null;
		};
		
		var destProjectFile = dir + "/" + name + ext;
		
		if (!fileApi.exists(destProjectFile))
		{
			var sourceDir = supportDir + "/" + language;
			
			var template = fileApi.getContent(sourceDir + "/project" + ext);
			template = template.split("{name}").join(name);
			fileApi.saveContent(destProjectFile, template);
			
			fileApi.copy(sourceDir + "/files", dir);
		}
	}
}
