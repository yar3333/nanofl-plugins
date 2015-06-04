import nanofl.engine.DocumentProperties;
import nanofl.engine.FileApi;
import nanofl.engine.Library;
import nanofl.engine.Plugins;
import nanofl.ide.plugins.IGeneratorPlugin;
import nanofl.ide.textureatlas.TextureAtlas;

import languages.*;
import ides.*;

class CreateJSEnginePlugin implements IGeneratorPlugin
{
	static function main() Plugins.registerGenerator(new CreateJSEnginePlugin());
	
	public function new() { }
	
	public var name = "CreateJS";
	public var modes =
	[
		"HTML",
		"JavaScript",
		"JavaScript/FlashDevelop",
		"JavaScript/MsVisualStudio2013",
		"TypeScript",
		"TypeScript/MsVisualStudio2013", 
		"Haxe",
		"Haxe/FlashDevelop"
	];
	
	public function generateFiles(mode:String, fileApi:FileApi, filePath:String, documentProperties:DocumentProperties, library:Library, textureAtlases:Map<String, TextureAtlas>) : Void
	{
		var supportDir = fileApi.getPluginsDirectory() + "/CreateJSEnginePlugin";
		
		var languageAndIde = mode.split("/");
		
		var pathParts = filePath.split("/");
		var dir = pathParts.slice(0, pathParts.length - 1).join("/");
		var nameExt = pathParts[pathParts.length - 1];
		var name = nameExt.lastIndexOf(".") > 0 ? nameExt.substring(0, nameExt.lastIndexOf(".")) : nameExt;
		
		var generator : BaseGenerator = switch(languageAndIde[0])
		{
			case "HTML":		new HtmlGenerator(fileApi, documentProperties, library, textureAtlases, supportDir);
			case "JavaScript":	new JavaScriptGenerator(fileApi, documentProperties, library, textureAtlases, supportDir);
			case "TypeScript":	new TypeScriptGenerator(fileApi, documentProperties, library, textureAtlases, supportDir);
			case "Haxe":		new HaxeGenerator(fileApi, documentProperties, library, textureAtlases, supportDir);
			case _: throw "Unsupported language '" + languageAndIde[0] + "'."; null;
		}
		trace("CreateJSEnginePlugin.generate filePath = " + filePath + "; supportDir = " + supportDir + "; dir= " + dir + "; name = " + name);
		generator.generate(dir, name);
		
		if (languageAndIde.length > 1)
		{
			switch (languageAndIde[1])
			{
				case "FlashDevelop": new FlashDevelopGenerator().generate(languageAndIde[0], fileApi, dir, name);
				case "MsVisualStudio2013": new MsVisualStudio2013Generator().generate(languageAndIde[0], fileApi, dir, name);
			}
		}
		
	}
}
