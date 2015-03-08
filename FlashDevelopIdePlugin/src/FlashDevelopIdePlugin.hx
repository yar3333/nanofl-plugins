import nanofl.engine.DocumentProperties;
import nanofl.engine.FileApi;
import nanofl.engine.Library;
import nanofl.engine.Plugins;
import nanofl.ide.plugins.IIdePlugin;

class FlashDevelopIdePlugin implements IIdePlugin
{
	static function main() Plugins.registerIde(new FlashDevelopIdePlugin());
	
	public function new() { }
	
	public var name = "FlashDevelop";
	
	public var languages = [ "JavaScript", "Haxe" ];
	
	public function generateFiles(language:String, fileApi:FileApi, filePath:String, documentProperties:DocumentProperties, library:Library) : Void
	{
		var pathParts = filePath.split("/");
		var dir = pathParts.slice(0, pathParts.length - 1).join("/");
		var nameExt = pathParts[pathParts.length - 1];
		var name = nameExt.lastIndexOf(".") > 0 ? nameExt.substring(0, nameExt.lastIndexOf(".")) : nameExt;
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
