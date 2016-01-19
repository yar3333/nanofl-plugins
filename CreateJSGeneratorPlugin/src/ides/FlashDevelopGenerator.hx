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
		
		if (!fileSystem.exists(destProjectFile))
		{
			var template = fileSystem.getContent(supportDir + "/ides/FlashDevelop/" + language + "/project" + ext);
			template = template.split("{name}").join(name);
			fileSystem.saveContent(destProjectFile, template);
			
			fileSystem.copy(supportDir + "/ides/FlashDevelop/" + language + "/files", dir);
		}
	}
}
