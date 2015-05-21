import nanofl.engine.DocumentProperties;
import nanofl.engine.FileApi;
import nanofl.engine.Library;
import nanofl.engine.Plugins;
import nanofl.ide.plugins.IEnginePlugin;

class CreateJSEnginePlugin implements IEnginePlugin
{
	static function main() Plugins.registerEngine(new CreateJSEnginePlugin());
	
	public function new() { }
	
	public var name = "CreateJS";
	public var languages = [ "HTML", "JavaScript", "TypeScript", "Haxe" ];
	
	public function generateFiles(language:String, fileApi:FileApi, filePath:String, documentProperties:DocumentProperties, library:Library) : Void
	{
		var supportDir = fileApi.getPluginsDirectory() + "/CreateJSEnginePlugin/" + language.toLowerCase();
		
		var generator = switch(language)
		{
			case "HTML":		new HtmlGenerator(fileApi, documentProperties, library, supportDir);
			case "JavaScript":	new JavaScriptGenerator(fileApi, documentProperties, library, supportDir);
			case "TypeScript":	new TypeScriptGenerator(fileApi, documentProperties, library, supportDir);
			case "Haxe":		new HaxeGenerator(fileApi, documentProperties, library, supportDir);
			case _: throw "Unsupported language '" + language + "'."; null;
		}
		
		var pathParts = filePath.split("/");
		var dir = pathParts.slice(0, pathParts.length - 1).join("/");
		var nameExt = pathParts[pathParts.length - 1];
		var name = nameExt.lastIndexOf(".") > 0 ? nameExt.substring(0, nameExt.lastIndexOf(".")) : nameExt;
		
		trace("CreateJSEnginePlugin.generate filePath = " + filePath + "; supportDir = " + supportDir + "; dir= " + dir + "; name = " + name);
		
		generator.generate(dir, name);
	}
}
